import { z } from "zod";

export const RegistrationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(1),
  lastName: z.string({ required_error: "Last name is required" }).min(1),
  email: z.string({ required_error: "Email is required" }).min(1).email({ message: "Invalid email address" }),
  orgName: z.string({ required_error: "Organization is required" }).min(1),
  orgSubdomain: z.string({ required_error: "Subdomain is required" }).min(1),
  orgColorScheme: z.object({
    primary: z.string({ required_error: "Primary color is required" }).min(1),
    secondary: z.string({ required_error: "Secondary color is required" }).min(1),
  }),
});
