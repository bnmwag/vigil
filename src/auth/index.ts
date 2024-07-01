import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth/config";
import { db } from "@/db/primary";
import { users } from "@/db/primary/schema";
import { eq } from "drizzle-orm";
import { config } from "@/config";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, user.id));
    },
  },
  secret: config.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // const existingUser = await getUserById(user.id)

      // if (!existingUser || !existingUser.emailVerified) return false

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      //   if (!twoFactorConfirmation) return false

      //   await db.delete(users).where(eq(users.id, existingUser.id))
      // }

      return true;
    },
    async session({ token, session }) {
      // if (token.sub && session.user) {
      //   session.user.id = token.sub
      // }

      // if (token.role && session.user) {
      //   session.user.role = token.role
      // }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      // }

      // if (session.user) {
      //   session.user.name = token.name
      //   session.user.email = token.email || session.user.email
      //   session.user.isOAuth = token.isOAuth as boolean
      // }

      session.user = { ...session.user, id: token.sub};

      return session;
    },
    async jwt({ token }) {
      // if (!token.sub) return token

      // const existingUser = await getUserById(token.sub)

      // if (!existingUser) return token

      // const existingAccount = await getAccountByUserId(existingUser.id)

      // token.isOAuth = !!existingAccount
      // token.name = existingUser.name
      // token.email = existingUser.email
      // token.role = existingUser.role
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
