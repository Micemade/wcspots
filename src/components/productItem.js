import ProductImage from "./productImage";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductExcerpt from "./productExcerpt";

const ProductItem = ({ productId, context }) => {

	const isEdit = productId !== 0 && context == 'edit';

	return (
		<div className="woo-lookblock-product" data-product-id={productId}>

			<div className="product-featured-image" id={`product-image-${productId}`}>
				{isEdit && (
					<ProductImage productId={productId} />
				)}
			</div>

			<h4 className="product-title" id={`product-title-${productId}`}>
				{isEdit && (
					<ProductTitle productId={productId} />
				)}
			</h4>


			<div className="product-price" id={`product-price-${productId}`}>
				{isEdit && (
					<ProductPrice productId={productId} />
				)}
			</div>

			<div className="product-excerpt" id={`product-excerpt-${productId}`}>
				{isEdit && (
					<ProductExcerpt productId={productId} />
				)}
			</div>

		</div>
	);
};

export default ProductItem;
