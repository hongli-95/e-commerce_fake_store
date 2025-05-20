import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col gap-2">
			<h1>Welcome!</h1>
			<div>
				<Link
					href={"/products"}
					className="border-2 border-black dark:border-white p-2"
				>
					Product Page
				</Link>
			</div>
		</div>
	);
}
