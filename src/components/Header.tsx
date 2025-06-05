"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
	return (
		<header
			className={`flex flex-row gap-10 top-0 sticky bg-white/0 transition-all z-1 dark:bg-black/70 backdrop-blur-md px-2`}
		>
			<h1 className="mr-auto text-xl font-bold p-2">Fake Store Pro</h1>
			<div>
				<div className="flex flex-row justify-center items-center gap-10">
					<div
						className="text-center relative group rounded-t-md transition-all w-50
											hover:bg-white hover:text-black"
					>
						<p className="cursor-default text-lg p-2">Clothing</p>
						<div
							className="absolute flex flex-col justify-center items-center gap-2 w-full bg-white rounded-b-md text-black h-0 transition-all overflow-hidden
							group-hover:h-30 group-hover:top-8"
						>
							<Link
								href={"/products?filter=mensclothing"}
								className="cursor-pointer w-full text-lg hover:bg-black hover:text-white transition-all p-2"
							>
								Men's Clothing
							</Link>
							<Link
								href={"/products?filter=womensclothing"}
								className="cursor-pointer w-full text-lg hover:bg-black hover:text-white transition-all p-2"
							>
								Women's Clothing
							</Link>
						</div>
					</div>

					<Link
						href={"/products?filter=jewelry"}
						className="cursor-pointer text-center w-50 text-lg rounded-md hover:bg-white hover:text-black transition-all p-2"
					>
						Jewelry
					</Link>
					<Link
						href={"/products?filter=electronics"}
						className="cursor-pointer text-center w-50 text-lg rounded-md hover:bg-white hover:text-black transition-all p-2"
					>
						Electronics
					</Link>
				</div>
			</div>
			<ThemeToggler />
		</header>
	);
}
