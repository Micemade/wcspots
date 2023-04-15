import ProductImage from "./productImage";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductExcerpt from "./productExcerpt";
import ProductAddToCart from "./productAddToCart";

const ProductItem = ({ context, productId, productsAlign, productPadding, productSpacing, titleSize, priceSize, addToCartSize, fontColors }) => {

	const isEdit = productId !== 0 && (context == 'edit' || context == 'both');

	const elementsStyle = {
		padding: `${productPadding.value}${productPadding.unit}`,
		alignItems: productsAlign
	}

	const titleStyle = {
		fontSize: `${titleSize.value}${titleSize.unit}`,
		color: fontColors.titleColor
	};
	const priceStyle = {
		fontSize: `${priceSize.value}${priceSize.unit}`,
		color: fontColors.priceColor
	};

	const addToCartStyle = {
		transform: `scale(${addToCartSize})`,
	}
	const spacing = {
		marginBottom: `${productSpacing.value}${productSpacing.unit}`
	}

	return (
		<div
			className={`woo-lookblock-product align-${productsAlign}`}
			data-product-id={productId}
		>

			<div className="product-featured-image" data-product-image={productId}>
				{isEdit && (
					<ProductImage productId={productId} />
				)}
			</div>

			<div className="product-elements" style={elementsStyle}>

				<h4 className="product-title product-element" data-product-title={productId} style={Object.assign(titleStyle, spacing)}>
					{isEdit && (
						<ProductTitle productId={productId} />
					)}
				</h4>

				<div className="product-price product-element" data-product-price={productId} style={Object.assign(priceStyle, spacing)}>
					{isEdit && (
						<ProductPrice productId={productId} />
					)}
				</div>

				<div className="product-excerpt product-element" data-product-excerpt={productId} style={spacing}>
					{isEdit && (
						<ProductExcerpt productId={productId} />
					)}
				</div>

				<div className="product-add-to-cart product-element" data-product-addtocart={productId} style={Object.assign(addToCartStyle, spacing)}>
					{isEdit && (
						<ProductAddToCart productId={productId} />
					)}
				</div>
			</div>

		</div>
	);
};

export default ProductItem;
