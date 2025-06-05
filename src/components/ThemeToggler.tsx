"use client";

import { useContext } from "react";
import StoreContext from "@/context/StoreContext";

export default function ThemeToggler() {
	const { state, dispatch } = useContext(StoreContext);
	return (
		<button
			className="cursor-pointer"
			onClick={() => dispatch({ type: "TOGGLE_THEME" })}
		>
			Mode: {state.theme}
		</button>
	);
}
