import ThemeToggler from "./ThemeToggler";

export default function Header() {
	return (
		<header className="flex flex-row">
			<h1>Fake Store Pro</h1>
			<ThemeToggler />
		</header>
	);
}
