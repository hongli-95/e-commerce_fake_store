import { Product } from "@/context/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "../StarIcon";

export default function ProductCard({ product }: { product: Product }) {
	const CapitalizeCategory = (category: string) => {
		const arr = category
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
		return arr.join(" ");
	};

	return (
		<Link
			href={`products/${product.id}`}
			className="flex flex-col border-2 border-black dark:border-white justify-center items-center h-full p-2 gap-4 rounded-md transition-all
			hover:ring-2 
			focus-within:ring-2
			"
		>
			<div className="">
				<Image
					src={product.image}
					alt={product.title + "-image"}
					width={130}
					height={1}
					style={{
						width: "auto",
						height: "13rem",
						aspectRatio: "auto",
						borderRadius: "0.375rem",
					}}
				/>
			</div>

			<div className="mt-auto mr-auto flex flex-col">
				<p className="text-lg line-clamp-1">{product.title}</p>
				<p className="text-sm">{CapitalizeCategory(product.category)}</p>
				<div className="flex flex-row items-center">
					{product.rating.rate}{" "}
					<StarIcon
						width={"1.5rem"}
						height={"1.5rem"}
					/>
					<p className="text-gray-400 text-sm">({product.rating.count})</p>
				</div>
				<p className="text-lg">${product.price}</p>
			</div>
		</Link>
	);
}
