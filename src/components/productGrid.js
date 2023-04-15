/**
 * Internal dependencies.
 */
import ProductItem from './productItem';

const ProductGrid = ({ productList, columns, productsGap, context, productsLayout, productsAlign, productPadding, productSpacing, titleSize, priceSize, addToCartSize, fontColors }) => {
	// const columnsByLayout = (productsLayout == 'layout1') ? columns : 1;
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${productsGap.value}${productsGap.unit}`,
	};

	return (
		<div style={gridStyle} className={`product-grid ${productsLayout}`}>
			{productList.map((productId) => (
				<ProductItem
					context={context}
					key={`product-${context}-${productId}`}
					productId={productId}
					productsAlign={productsAlign}
					productPadding={productPadding}
					productSpacing={productSpacing}
					titleSize={titleSize}
					priceSize={priceSize}
					addToCartSize={addToCartSize}
					fontColors={fontColors}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
