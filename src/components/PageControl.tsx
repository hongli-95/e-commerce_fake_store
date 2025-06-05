"use client";
import React, { MouseEvent, useCallback } from "react";

import { useContext, useEffect } from "react";
import StoreContext from "@/context/StoreContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PageControl() {
	const { state, dispatch } = useContext(StoreContext);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updatePage = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLButtonElement) {
			if (e.target.textContent === "Prev") {
				dispatch({ type: "PREV_PAGE" });
				router.push(`${pathname}?page=${(state.currentPage - 1).toString()}`);
			} else {
				dispatch({ type: "NEXT_PAGE" });
				router.push(`${pathname}?page=${(state.currentPage + 1).toString()}`);
			}
		}
	};

	// const createQuery = useCallback(
	// 	(name: string, value: string) => {
	// 		const params = new URLSearchParams(searchParams.toString());
	// 		params.set(name, value);

	// 		return params.toString();
	// 	},
	// 	[searchParams]
	// );

	const pageContent = (currentPage: number, itemsPerPage: number) => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = currentPage * itemsPerPage;
		dispatch({
			type: "SET_DISPLAY",
			payload: [...state.filteredProducts].slice(startIndex, endIndex),
		});
	};

	useEffect(() => {
		const query = searchParams.get("page");
		if (query) {
			dispatch({ type: "SET_CURRENTPAGE", payload: Number(query) });
			pageContent(state.currentPage, state.productsPerPage);
		} else {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_CURRENTPAGE", payload: 1 });
			dispatch({ type: "SET_LOADING", payload: false });
		}
	}, [searchParams]);

	useEffect(() => {
		pageContent(state.currentPage, state.productsPerPage);
	}, [state.currentPage, state.filteredProducts]);

	return (
		<div
			onClick={updatePage}
			className="flex flex-row justify-center items-center gap-4"
		>
			<button
				className={`border-2 p-2 rounded-md ${
					state.currentPage === 1
						? "text-gray-400 border-gray-400 cursor-auto"
						: "cursor-pointer"
				}`}
				disabled={state.currentPage === 1}
			>
				Prev
			</button>
			<div>{state.currentPage}</div>
			<button
				className={`border-2 p-2 rounded-md ${
					state.currentPage >=
					Math.ceil(state.filteredProducts.length / state.productsPerPage)
						? "text-gray-400 border-gray-400 cursor-auto"
						: "cursor-pointer"
				}`}
				disabled={
					state.currentPage >=
					Math.ceil(state.filteredProducts.length / state.productsPerPage)
				}
			>
				Next
			</button>
		</div>
	);
}
