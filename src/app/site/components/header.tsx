"use client";

import Link from "next/link";
import type { FC } from "react";
import { Nav } from "./nav";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { signOut } from "@/auth";
import { logout } from "@/actions/logout";

export const Header: FC = () => {
  const user = useCurrentUser();

  return (
    <header>
      <nav className="border-neutral-200 px-4 lg:px-6 py-2.5">
        <div className="grid grid-cols-3 mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vigil&trade;</span>
          </Link>
          <div className="hidden justify-center items-center w-full lg:flex lg:w-auto" id="mobile-menu-2">
            <Nav />
          </div>
          <div className="flex items-center justify-end">
            {user ? (
              <>
                <div>{user.name}</div>
                <Button onClick={() => logout()}>Sign out</Button>
              </>
            ) : (
              <>
                <Button onClick={() => signIn("github")}>Sign in</Button>
                <Link href="/get-started" className={cn(buttonVariants({ variant: "default" }))}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
