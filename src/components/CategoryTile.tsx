"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryTile({
	imageSrc,
	category,
	width,
	height,
}: {
	imageSrc: StaticImageData;
	category: string;
	width: number;
	height: number;
}) {
	return (
		<div className="relative group cursor-pointer rounded-md">
			<Link
				href={`/products?filter=${category
					.replace(" ", "")
					.replace("'", "")
					.toLowerCase()}`}
			>
				<Image
					src={imageSrc}
					alt={`${category}-tileImage`}
					width={width}
					height={height}
					style={{ width: "auto", height: "auto", borderRadius: "0.375rem" }}
				/>
				<div
					className="absolute w-full bottom-0 text-2xl h-full rounded-md
      group-hover:bg-black/60 group-hover:h-full
        transition-all"
				>
					<div className="absolute top-[50%] left-[50%] translate-[-50%] opacity-0 transition-all group-hover:opacity-100">
						{category}
					</div>
				</div>
			</Link>
		</div>
	);
}
