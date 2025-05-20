"use client";

import {
	createContext,
	useReducer,
	ReactNode,
	Dispatch,
	useEffect,
} from "react";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { count: number; rate: number };
};

type Theme = "light" | "dark";

type StoreState = {
	theme: Theme;
	products: Product[];
	productsDisplay: Product[];
	cart: Product[];
	loading: boolean;
	filter: string;
	error: string;
};

type Action =
	| { type: "TOGGLE_THEME" }
	| { type: "SET_PRODUCTS"; payload: Product[] }
	| { type: "ADD_TO_CART"; payload: Product }
	| { type: "REMOVE_FROM_CART"; payload: number }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_ERROR"; payload: string }
	| { type: "SET_FILTER"; payload: string }
	| { type: "SET_DISPLAY"; payload: Product[] };

const initialState: StoreState = {
	theme: "dark",
	products: [],
	productsDisplay: [],
	cart: [],
	loading: false,
	filter: "none",
	error: "",
};

const StoreContext = createContext<{
	state: StoreState;
	dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// reducer function setting up different actions
function reducer(state: StoreState, action: Action): StoreState {
	switch (action.type) {
		case "TOGGLE_THEME":
			return { ...state, theme: state.theme === "light" ? "dark" : "light" };
		case "SET_PRODUCTS":
			return { ...state, products: action.payload };
		case "ADD_TO_CART":
			return { ...state, cart: [...state.cart, action.payload] };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ERROR":
			return { ...state, error: action.payload };
		case "SET_FILTER":
			return { ...state, filter: action.payload };
		case "SET_DISPLAY":
			return { ...state, productsDisplay: action.payload };
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		default:
			return state;
	}
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		document.documentElement.classList.toggle("dark");
	}, [state.theme]);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;
