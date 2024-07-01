import { JWT } from "@auth/core/jwt"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = {
  id: string
  // isTwoFactorEnabled: boolean
  // isOAuth: boolean
} & DefaultSession["user"]

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    // role: ExtendedUser["role"]
    // isTwoFactorEnabled: ExtendedUser["isTwoFactorEnabled"]
    // isOAuth: ExtendedUser["isOAuth"]
  }
}
