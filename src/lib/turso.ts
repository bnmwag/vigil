import { config } from "@/config";

export type DatabaseAPI = {
  create({
    name,
    location,
    image,
    group,
  }: {
    name: string;
    location?: string;
    image?: "latest" | "canary";
    group?: string;
    seed?: {
      type: "database";
      name: string;
    };
  }): Promise<{
    database: LogicalDatabase;
  }>;
};

export type GroupAPI = {
  getAll(): Promise<{
    groups: Group[];
  }>;
  create(
    name: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
  get(group: string): Promise<{
    group: Group;
  }>;
  delete(group: string): Promise<{
    group: Group;
  }>;
  addLocation(
    group: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
  removeLocation(
    group: string,
    location: string,
  ): Promise<{
    group: Group;
  }>;
};

type Group = {
  locations: string[];
  name: string;
  primary: string;
};

export type AuthenticationAPI = {
  listTokens(): Promise<{
    tokens: PlatformApiToken[];
  }>;
  mintToken(token_name: string): Promise<PlatformApiToken & { token: string }>;
  revokeToken(token_name: string): Promise<{ token: string }>;
  validateToken(): Promise<{ exp: number }>;
};

export type OrganizationAPI = {
  list(): Promise<{
    organizations: Organization[];
  }>;
  listMembers(org_slug: string): Promise<{
    members: OrganizationMember[];
  }>;
};

export type LocationAPI = {
  list(): Promise<{
    locations: Record<string, string>;
  }>;
};

export type LogicalDatabaseAPI = {
  getAll(org_slug: string): Promise<{
    databases: LogicalDatabase[];
  }>;
  getByName(
    org_slug: string,
    db_name: string,
  ): Promise<{
    database: LogicalDatabase;
  }>;
  create(
    org_slug: string,
    name: string,
    image: "latest" | "canary",
  ): Promise<{
    database: LogicalDatabase;
  }>;
  updateAll(org_slug: string, db_name: string): Promise<void>;
  destroy(org_slug: string, db_name: string): Promise<{ database: string }>;
  mintAuthToken(
    org_slug: string,
    db_name: string,
    expiration?: string,
    authorization?: "read-only" | "full-access",
  ): Promise<{ jwt: string }>;
  invalidateAllAuthTokens(org_slug: string, db_name: string): Promise<void>;
  getCurrentMonthUsage(
    org_slug: string,
    db_name: string,
  ): Promise<{
    database: LogicalDatabase;
  }>;
};

export type DatabaseInstanceAPI = {
  getAll(
    org_slug: string,
    db_name: string,
  ): Promise<{
    instances: DatabaseInstance[];
  }>;
  get(
    org_slug: string,
    db_name: string,
    instance_name: string,
  ): Promise<{
    instance: DatabaseInstance;
  }>;
  create(
    org_slug: string,
    db_name: string,
    location: string,
    image?: "latest" | "canary",
  ): Promise<{
    instance: DatabaseInstance;
  }>;
  destroy(
    org_slug: string,
    db_name: string,
    instance_name: string,
  ): Promise<{
    instance: string;
  }>;
};

export type Organization = {
  name: string;
  slug: string;
  type: "personal" | "team";
};

export type OrganizationMember = {
  username: string;
  role: "owner" | "member";
};

export type PlatformApiToken = {
  id: string;
  name: string;
};

export type LogicalDatabase = {
  Name: string;
  Hostname: string;
  IssuedCertLimit: number;
  IssuedCertCount: number;
  DbId: string;
  regions: string[];
  primaryRegion: string;
  type: "logical";
};

export type LogicalDatabaseUsage = {
  uuid: string;
  instances: DatabaseInstanceUsage[];
};

export type DatabaseInstanceUsage = {
  uuid: string;
  usage: Usage;
};

export type Usage = {
  rows_read: number;
  rows_written: number;
  storage_bytes: number;
};

export type DatabaseInstance = {
  uuid: string;
  name: string;
  type: "primary" | "replica";
  region: string;
  hostname: string;
};

class TursoClient {
  private BASE_URL = "https://api.turso.tech";
  constructor(private API_TOKEN: string) {}

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`,
        ...options?.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Error fetching ${path}: ${res.statusText}`);
    }
    return res.json();
  }

  public databases: DatabaseAPI = {
    create: ({ name, location, image, group }) =>
      this.fetch("/v1/databases", {
        method: "POST",
        body: JSON.stringify({
          name,
          location,
          image,
          group,
        }),
      }),
  };

  public authentication: AuthenticationAPI = {
    listTokens: () => this.fetch("/v1/auth/api-tokens"),
    mintToken: (token_name: string) =>
      this.fetch(`/v1/auth/api-tokens/${token_name}`, {
        method: "POST",
      }),
    revokeToken: (token_name: string) =>
      this.fetch(`/v1/auth/api-tokens/${token_name}`, {
        method: "DELETE",
      }),
    validateToken: () => this.fetch("/v1/auth/validate"),
  };

  public organization: OrganizationAPI = {
    list: () => this.fetch("/v1/organizations"),
    listMembers: (org_slug: string) => this.fetch(`/v1/organizations/${org_slug}/members`),
  };

  public locations: LocationAPI = {
    list: () => this.fetch("/v1/locations"),
  };

  public logicalDatabases: LogicalDatabaseAPI = {
    getAll: (org_slug: string) => this.fetch(`/v1/organizations/${org_slug}/databases`),
    getByName: (org_slug: string, db_name: string) => this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}`),
    create: (org_slug: string, name: string, image: "latest" | "canary") =>
      this.fetch(`/v1/organizations/${org_slug}/databases`, {
        method: "POST",
        body: JSON.stringify({
          name,
          image,
        }),
      }),
    updateAll: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/update`, {
        method: "POST",
      }),
    destroy: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}`, {
        method: "DELETE",
      }),
    mintAuthToken: (
      org_slug: string,
      db_name: string,
      expiration?: string,
      authorization?: "read-only" | "full-access",
    ) => {
      const params = new URLSearchParams();
      if (expiration) {
        params.set("expiration", expiration);
      }
      if (authorization) {
        params.set("authorization", authorization);
      }
      return this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/auth/tokens?${params.toString()}`, {
        method: "POST",
      });
    },
    invalidateAllAuthTokens: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/auth/rotate`, {
        method: "POST",
      }),
    getCurrentMonthUsage: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/usage`),
  };

  public databaseInstances: DatabaseInstanceAPI = {
    getAll: (org_slug: string, db_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/instances`),
    get: (org_slug: string, db_name: string, instance_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/instances/${instance_name}`),
    create: (org_slug: string, db_name: string, location: string, image?: "latest" | "canary") =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/instances`, {
        method: "POST",
        body: JSON.stringify({
          location,
          image,
        }),
      }),
    destroy: (org_slug: string, db_name: string, instance_name: string) =>
      this.fetch(`/v1/organizations/${org_slug}/databases/${db_name}/instances/${instance_name}`, {
        method: "DELETE",
      }),
  };

  public groups: GroupAPI = {
    getAll: () => this.fetch("/v1/groups"),
    create: (name: string, location: string) =>
      this.fetch("/v1/groups", {
        method: "POST",
        body: JSON.stringify({
          name,
          location,
        }),
      }),
    get: (group: string) => this.fetch(`/v1/groups/${group}`),
    delete: (group: string) =>
      this.fetch(`/v1/groups/${group}`, {
        method: "DELETE",
      }),
    addLocation: (group: string, location: string) =>
      this.fetch(`/v1/groups/${group}/locations/${location}`, {
        method: "POST",
      }),
    removeLocation: (group: string, location: string) =>
      this.fetch(`/v1/groups/${group}/locations/${location}`, {
        method: "DELETE",
      }),
  };
}

const createClient = (API_TOKEN: string) => new TursoClient(API_TOKEN);
export const turso = createClient(config.env.TURSO_API_KEY);
