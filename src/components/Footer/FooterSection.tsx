import Link from "next/link";
import React from "react";

export default function FooterSection({
	heading,
	content,
}: {
	heading: string;
	content: string | string[];
}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="font-semibold">{heading}</div>
			<hr />
			<div className="flex flex-col gap-2">
				{Array.isArray(content) && heading === "Category" ? (
					content.map((item, index) => (
						<Link
							href={`/products?filter=${item
								.replace(" ", "")
								.replace("'", "")
								.toLowerCase()}`}
							key={index}
						>
							{item}
						</Link>
					))
				) : Array.isArray(content) && heading === "Customer Service" ? (
					content.map((item, index) => (
						<Link
							key={index}
							href={"#"}
						>
							{item}
						</Link>
					))
				) : Array.isArray(content) ? (
					content.map((item, index) => <div key={index}>{item}</div>)
				) : (
					<div className="w-2/3">{content}</div>
				)}
			</div>
		</div>
	);
}
