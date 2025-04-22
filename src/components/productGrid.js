/**
 * Internal dependencies.
 */
import ProductItem from './productItem';

const ProductGrid = ({
	productIds,
	columns,
	featuredImageSize,
	productsGap,
	context,
	productsLayout,
	productsAlign,
	productsValign,
	productsHeight,
	productPadding,
	productSpacing,
	elementsToggle,
	imageSize,
	titleSize,
	priceSize,
	excerptSize,
	addToCartSize,
	productBackColor,
	fontColors
}) => {

	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: productsGap,
	};

	return (
		<div style={gridStyle} className={`product-grid ${productsLayout}`}>
			{productIds.map((productId) => (
				<ProductItem
					context={context}
					key={`product-${context}-${productId}`}
					productId={productId}
					featuredImageSize={featuredImageSize}
					productsLayout={productsLayout}
					productsAlign={productsAlign}
					productsValign={productsValign}
					productsHeight={productsHeight}
					productPadding={productPadding}
					productSpacing={productSpacing}
					elementsToggle={elementsToggle}
					imageSize={imageSize}
					titleSize={titleSize}
					priceSize={priceSize}
					excerptSize={excerptSize}
					addToCartSize={addToCartSize}
					productBackColor={productBackColor}
					fontColors={fontColors}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
