import { config } from "@/config";
import { init } from "@paralleldrive/cuid2";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const createId = init({ length: 7 });

export function createDatabaseId() {
  return createId();
}

export function redirectToSubdomain(subdomain: string) {
  redirect(
    `${config.env.NODE_ENV === "production" ? "https" : "http"}://${subdomain}.${config.env.NEXT_PUBLIC_DOMAIN}`,
  );
}
