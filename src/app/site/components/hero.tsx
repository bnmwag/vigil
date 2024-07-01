import { ArrowRightIcon, ChevronRightIcon, VideoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

export const Hero: FC = () => {
  return (
    <section>
      <div className="pt-8 pb-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <Link
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-neutral-700 bg-neutral-100 rounded-full dark:bg-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
          role="alert"
        >
          <span className="text-xs bg-brand-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>{" "}
          <span className="text-sm font-medium">Vigil is out! See what's new</span>
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-neutral-900 md:text-5xl lg:text-6xl dark:text-white">
          We invest in the world’s potential
        </h1>
        <p className="mb-8 text-lg font-normal text-neutral-500 lg:text-xl sm:px-16 xl:px-48 dark:text-neutral-400">
          Here at Vigil we focus on markets where technology, innovation, and capital can unlock long-term value and
          drive economic growth.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-300 dark:focus:ring-brand-900"
          >
            Learn more
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-neutral-900 rounded-lg border border-neutral-300 hover:bg-neutral-100 focus:ring-4 focus:ring-neutral-100 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
          >
            <VideoIcon className="mr-2 -ml-1 w-5 h-5" />
            Watch video
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-4 pb-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-neutral-50/5 p-2 ring-1 ring-inset ring-neutral-50/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src={"/dashboard-preview.jpg"}
              width={1364}
              height={866}
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-neutral-50/10"
              alt="Dashboard preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
