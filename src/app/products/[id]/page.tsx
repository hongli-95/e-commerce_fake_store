import ProductDetail from "@/components/Products/ProductDetail";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: number }>;
}) {
	const { id } = await params;

	return (
		<div>
			<ProductDetail productId={id} />
		</div>
	);
}
