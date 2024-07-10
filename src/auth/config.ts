// import bcrypt from "bcryptjs"
import { config } from "@/config";
// import credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google"

export default {
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error",
  // },
  providers: [
    GitHub({
      clientId: config.env.AUTH_GITHUB_ID,
      clientSecret: config.env.AUTH_GITHUB_SECRET,
    }),
    // credentials({
    //   async authorize(credentials) {
    //     const validatedFields = LoginSchema.safeParse(credentials)

    //     if (validatedFields.success) {
    //       const { email, password } = validatedFields.data

    //       const user = await getUserByEmail(email)
    //       if (!user || !user.password) return null

    //       const passwordsMatch = await bcrypt.compare(password, user.password)

    //       if (passwordsMatch) return user
    //     }

    //     return null
    //   },
    // }),
  ],
};
