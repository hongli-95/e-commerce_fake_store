"use client";

import { MouseEvent, useCallback, useContext, useEffect } from "react";
import StoreContext from "@/context/StoreContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
	const categories = [
		"Men's Clothing",
		"Women's Clothing",
		"Jewelery",
		"Electronics",
		"Clear Filter",
	];

	const { state, dispatch } = useContext(StoreContext);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	// check if there is a filter on component mount
	// if there isn't, pass in "none".
	useEffect(() => {
		const query = searchParams.get("filter");
		if (query) {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_FILTER", payload: query });
			dispatch({
				type: "SET_DISPLAY",
				payload: state.products.filter(
					(item) => item.category.replace(" ", "").replace("'", "") === query
				),
			});
			dispatch({ type: "SET_LOADING", payload: false });
		} else {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_FILTER", payload: "none" });
			dispatch({ type: "SET_LOADING", payload: false });
		}
	}, [searchParams]);

	const createQuery = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	// dispatch({
	// 					type: "SET_FILTER",
	// 					payload: e.target.textContent
	// 						.replace(" ", "")
	// 						.replace("'", "")
	// 						.toLowerCase(),
	// 				});
	// 				dispatch({
	// 					type: "SET_DISPLAY",
	// 					payload: state.products.filter(
	// 						(item) => item.category === "men's clothing"
	// 					),
	// 				});
	// 				router.push(
	// 					`${pathname}?${createQuery(
	// 						"filter",
	// 						e.target.textContent
	// 							.replace(" ", "")
	// 							.replace("'", "")
	// 							.toLowerCase()
	// 					)}`
	// 				);

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.target instanceof HTMLButtonElement) {
			if (e.target.textContent && e.target.textContent !== "Clear Filter") {
				dispatch({
					type: "SET_FILTER",
					payload: e.target.textContent
						.replace(" ", "")
						.replace("'", "")
						.toLowerCase(),
				});
				dispatch({
					type: "SET_DISPLAY",
					payload: state.products.filter(
						(item) =>
							item.category.replace(" ", "").replace("'", "") ===
							(e.target as HTMLButtonElement).textContent
								?.replace(" ", "")
								.replace("'", "")
								.toLowerCase()
					),
				});
				router.push(
					`${pathname}?${createQuery(
						"filter",
						e.target.textContent.replace(" ", "").replace("'", "").toLowerCase()
					)}`
				);
			} else {
				dispatch({
					type: "SET_FILTER",
					payload: "none",
				});
				dispatch({ type: "SET_DISPLAY", payload: state.products });
				router.replace(pathname);
			}
		}
	};

	return (
		<div
			className="flex flex-col gap-2 w-[10rem]"
			onClick={handleClick}
		>
			{categories.map((category, index) => (
				<button
					key={index}
					className={`cursor-pointer rounded-sm transition-all
            ${
							category !== "Clear Filter"
								? "hover:bg-orange-400 dark:hover:bg-gray-300 dark:hover:text-black"
								: "hover:underline"
						}
             ${category !== "Clear Filter" ? "border-2" : ""} ${
						category.replace(" ", "").replace("'", "").toLowerCase() ===
						state.filter
							? "bg-orange-400 dark:bg-white dark:text-black"
							: ""
					}`}
				>
					{category}
				</button>
			))}
		</div>
	);
}
