/**
 * Internal dependencies.
 */
import ProductItem from './productItem';

const ProductGrid = ({ products, columns, gap, context }) => {
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${gap}px`,
	};
	return (
		<div style={gridStyle} className="product-grid">
			{products.map((product) => (
				<ProductItem
					key={`product-${context}-${product.id}`}
					product={product}
					context={context}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
