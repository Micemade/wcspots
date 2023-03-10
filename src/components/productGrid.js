/**
 * Internal dependencies.
 */
import ProductItem from './productItem';

const ProductGrid = ({ productList, columns, gap, context }) => {
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${gap}px`,
	};

	return (
		<div style={gridStyle} className="product-grid">
			{productList.map((productId) => (
				<ProductItem
					key={`product-${context}-${productId}`}
					productId={productId}
					context={context}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
