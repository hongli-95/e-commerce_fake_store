"use client";

import { useContext, useEffect } from "react";
import StoreContext, { Product } from "@/context/StoreContext";
import ProductCard from "@/components/Products/ProductCard";
import Sidebar from "@/components/Sidebar";
import PageControl from "@/components/PageControl";

export default function Products() {
	const { state, dispatch } = useContext(StoreContext);

	// Fake Store API comes with 'jewelery' as one of the categories
	// 'jewelry' or 'jewellery' is the correct spelling
	const correctSpellingForJewelry = (array: Product[]) => {
		return array.map((object) => {
			if (object["category"] === "jewelery") {
				return { ...object, category: "jewelry" };
			}
			return object;
		});
	};

	// async fetch all products
	async function fetchProducts() {
		try {
			dispatch({ type: "SET_LOADING", payload: true });

			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json();

			const updatedData = correctSpellingForJewelry(data);
			// console.log(updatedData);

			dispatch({ type: "SET_PRODUCTS", payload: updatedData });
			dispatch({ type: "SET_LOADING", payload: false });
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: "Something went wrong." });
			dispatch({ type: "SET_LOADING", payload: false });
			// console.log(error);
		}
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="flex flex-col gap-2">
			{state.loading ? (
				<p>Loading...</p>
			) : !state.error && !state.loading ? (
				<div className="flex flex-row gap-2">
					<Sidebar />
					<div className="flex flex-col gap-4 w-[90%]">
						<div className="flex flex-row gap-5 flex-wrap justify-center">
							{!state.error && state.products.length
								? state.displayedProducts.map((product) => (
										<div
											key={product.id}
											className="w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/5"
										>
											<ProductCard product={product} />
										</div>
								  ))
								: null}
						</div>
						<PageControl />
					</div>
				</div>
			) : (
				<p>{state.error}</p>
			)}
		</div>
	);
}
