import CategoryTile from "@/components/CategoryTile";
import Link from "next/link";
import femaleImage from "../images/female.webp";
import maleImage from "../images/male.webp";
import jewelryImage from "../images/jewelry.webp";
import keyboardImage from "../images/keyboard.webp";

export default function Home() {
	return (
		<main className="flex flex-col gap-4 justify-center">
			<h1>Welcome!</h1>

			<div className="flex flex-col gap-2 justify-center items-center">
				<div>
					<p className="text-xl font-bold">Shop By Category</p>
				</div>
				<div className="grid gap-6 justify-center w-2/3 self-center">
					<div className="row-span-2 col-span-3 row-start-1 col-start-1 row-end-1 col-end-3">
						<CategoryTile
							imageSrc={maleImage}
							category="Men's Clothing"
							width={300}
							height={200}
						/>
					</div>
					<div className="row-span-3 col-span-2 col-start-3 row-start-1 row-end-3">
						<CategoryTile
							imageSrc={femaleImage}
							category="Women's Clothing"
							width={300}
							height={300}
						/>
					</div>
					<div className="col-span-2 row-end-5 row-start-2">
						<CategoryTile
							imageSrc={jewelryImage}
							category="Jewelry"
							width={300}
							height={300}
						/>
					</div>
					<div className="row-span-2 col-span-3 col-start-3 col-end-5 row-end-5">
						<CategoryTile
							imageSrc={keyboardImage}
							category="Electronics"
							width={300}
							height={200}
						/>
					</div>
				</div>
			</div>

			<div className="self-center">
				<Link
					href={"/products"}
					className="border-2 border-black dark:border-white p-2 rounded-md transition-all
										hover:bg-white hover:text-black 
											focus-within:bg-white focus-within:text-black"
				>
					Browse All Products
				</Link>
			</div>
		</main>
	);
}
