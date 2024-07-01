import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-neutral-900">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vigil&trade;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-neutral-600 dark:text-neutral-400">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Vigil
                  </Link>
                </li>
                <li>
                  <Link href="https://tailwindcss.com/" className="hover:underline">
                    Tailwind CSS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-neutral-600 dark:text-neutral-400">
                <li className="mb-4">
                  <Link href="https://github.com/themesberg/Vigil" className="hover:underline ">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-neutral-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-neutral-600 dark:text-neutral-400">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-neutral-200 sm:mx-auto dark:border-neutral-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-neutral-500 sm:text-center dark:text-neutral-400">
            © 2022{" "}
            <Link href="/" className="hover:underline">
              Vigil™
            </Link>
            . All Rights Reserved.
          </span>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
