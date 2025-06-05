import FooterSection from "./FooterSection";

export default function Footer() {
	return (
		<footer className="mt-auto flex flex-row gap-2 w-full justify-around self-center bg-gray-800 text-gray-400 p-2 rounded-t-md outline-1">
			<FooterSection
				heading={"Fake Store Pro"}
				content={"This is your dream shop where you find everything you need."}
			/>
			<FooterSection
				heading="Category"
				content={[
					"Men's Clothing",
					"Women's Clothing",
					"Jewelry",
					"Electronics",
				]}
			/>
			<FooterSection
				heading="Customer Service"
				content={["Contant Us", "FAQ", "Return Policy", "Tracking Order"]}
			/>
			<FooterSection
				heading="Contact Us"
				content={[
					"123 Random St, Los Angeles, CA",
					"+1 (602) 123-4567",
					"support@fakestorepro.com",
					"Mon-Sat: 9AM - 8PM",
				]}
			/>
		</footer>
	);
}
