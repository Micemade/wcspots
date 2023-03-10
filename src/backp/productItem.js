import ProductImage from "./productImage";

const ProductItem = ({ product, context }) => {

	return (
		<div className="woo-lookblock-product">

			<h4><a href={product.link}>{product.title?.rendered}</a></h4>

			<div className="product-featured-image" id={`product-image-${product.id}`} data-product-id={product.id}>
				{(product.id !== 0 && context == 'edit') && (
					<ProductImage productId={product.id} />
				)}
			</div>

			<p className="product-excerpt">{product.excerpt?.raw}</p>

		</div>
	);
};

export default ProductItem;
