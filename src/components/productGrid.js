/**
 * Internal dependencies.
 */
import ProductItem from './productItem';

const ProductGrid = ({
	productList,
	columns,
	productsGap,
	context,
	productsLayout,
	productsAlign,
	productPadding,
	productSpacing,
	elementsToggle,
	titleSize,
	priceSize,
	addToCartSize,
	productBackColor,
	fontColors
}) => {

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
					productsLayout={productsLayout}
					productsAlign={productsAlign}
					productPadding={productPadding}
					productSpacing={productSpacing}
					elementsToggle={elementsToggle}
					titleSize={titleSize}
					priceSize={priceSize}
					addToCartSize={addToCartSize}
					productBackColor={productBackColor}
					fontColors={fontColors}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
