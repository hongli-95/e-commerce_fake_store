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
	filteredProducts: Product[];
	displayedProducts: Product[];
	cart: Product[];
	loading: boolean;
	filter: string;
	currentPage: number;
	productsPerPage: number;
	startIndex: number;
	endIndex: number;
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
	| { type: "SET_CURRENTPAGE"; payload: number }
	| { type: "NEXT_PAGE" }
	| { type: "PREV_PAGE" }
	| { type: "UPDATE_STARTINDEX"; payload: number }
	| { type: "UPDATE_ENDINDEX"; payload: number }
	| { type: "SET_DISPLAY"; payload: Product[] }
	| { type: "SET_FILTERED"; payload: Product[] };

const initialState: StoreState = {
	theme: "dark",
	products: [],
	filteredProducts: [],
	displayedProducts: [],
	cart: [],
	loading: false,
	filter: "none",
	currentPage: 1,
	productsPerPage: 12,
	startIndex: 0,
	endIndex: 1,
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
		case "NEXT_PAGE":
			return { ...state, currentPage: state.currentPage++ };
		case "PREV_PAGE":
			return { ...state, currentPage: state.currentPage-- };
		case "SET_CURRENTPAGE":
			return { ...state, currentPage: action.payload };
		case "SET_FILTERED":
			return { ...state, filteredProducts: action.payload };
		case "SET_DISPLAY":
			return { ...state, displayedProducts: action.payload };
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
