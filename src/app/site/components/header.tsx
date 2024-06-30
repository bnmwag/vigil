import Link from "next/link";
import type { FC } from "react";
import { Nav } from "./nav";

export const Header: FC = () => {
	return (
		<header>
			<nav className="border-neutral-200 px-4 lg:px-6 py-2.5">
				<div className="grid grid-cols-3 mx-auto max-w-screen-xl">
					<Link href="https://flowbite.com" className="flex items-center">
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Vigil&trade;
						</span>
					</Link>
					<div
						className="hidden justify-center items-center w-full lg:flex lg:w-auto"
						id="mobile-menu-2"
					>
						<Nav />
					</div>
					<div className="flex items-center justify-end">
						<Link
							href="#"
							className="text-white bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-brand-600 dark:hover:bg-brand-700 focus:outline-none dark:focus:ring-brand-800"
						>
							Get started
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};
