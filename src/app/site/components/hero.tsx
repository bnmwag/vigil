import Link from "next/link";
import type { FC } from "react";

export const Hero: FC = () => {
	return (
		<section>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
				<Link
					href="#"
					className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-neutral-700 bg-neutral-100 rounded-full dark:bg-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
					role="alert"
				>
					<span className="text-xs bg-brand-600 rounded-full text-white px-4 py-1.5 mr-3">
						New
					</span>{" "}
					<span className="text-sm font-medium">
						Flowbite is out! See what's new
					</span>
					<svg
						className="ml-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						></path>
					</svg>
				</Link>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-neutral-900 md:text-5xl lg:text-6xl dark:text-white">
					We invest in the world’s potential
				</h1>
				<p className="mb-8 text-lg font-normal text-neutral-500 lg:text-xl sm:px-16 xl:px-48 dark:text-neutral-400">
					Here at Flowbite we focus on markets where technology, innovation, and
					capital can unlock long-term value and drive economic growth.
				</p>
				<div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
					<Link
						href="#"
						className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-300 dark:focus:ring-brand-900"
					>
						Learn more
						<svg
							className="ml-2 -mr-1 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
					</Link>
					<Link
						href="#"
						className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-neutral-900 rounded-lg border border-neutral-300 hover:bg-neutral-100 focus:ring-4 focus:ring-neutral-100 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
					>
						<svg
							className="mr-2 -ml-1 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
						</svg>
						Watch video
					</Link>
				</div>
			</div>
		</section>
	);
};
