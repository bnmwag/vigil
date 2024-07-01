import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string({ required_error: "Organization is required" }).min(1),
  subdomain: z.string({ required_error: "Subdomain is required" }).min(1),
});
