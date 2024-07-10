import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "@/auth/config";
import { config } from "@/config";
import { db } from "@/db/primary";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const useSecureCookies = config.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(config.env.NEXTAUTH_URL).hostname;

console.log({
  useSecureCookies,
  cookiePrefix,
  hostName,
});

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  secret: config.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName === "localhost" ? hostName : `.${hostName}`,
      },
    },
  },
  adapter: DrizzleAdapter(db),
  ...authConfig,
});
