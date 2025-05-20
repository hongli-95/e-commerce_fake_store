"use client";

import { useContext, useEffect } from "react";
import StoreContext from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

export default function Products() {
	const { state, dispatch } = useContext(StoreContext);

	// async fetch all products
	async function fetchProducts() {
		try {
			dispatch({ type: "SET_LOADING", payload: true });

			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json();

			// console.log(data);

			dispatch({ type: "SET_PRODUCTS", payload: data });
			dispatch({ type: "SET_DISPLAY", payload: data });
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
					<div className="flex flex-row gap-5 flex-wrap justify-center w-[90%]">
						{!state.error && state.products.length
							? state.productsDisplay.map((product) => (
									<div
										key={product.id}
										className="w-3/4 md:w-1/3 lg:w-1/4 xl:w-1/5"
									>
										<ProductCard product={product} />
									</div>
							  ))
							: null}
					</div>
				</div>
			) : (
				<p>{state.error}</p>
			)}
		</div>
	);
}
