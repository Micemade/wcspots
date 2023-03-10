import { render } from "react-dom";
import apiFetch from "@wordpress/api-fetch";

const ProductImage = (productId, containerId) => {
	apiFetch({
		path: `/wc/store/v1/products/${productId}`
	})
		.then(product => {
			const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : null;
			const imageFallback = typeof wc == 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={product.name} />) : (__('Product has no featured image', 'woo-lookblock'));
			if (imageUrl) {
				render(
					<img src={imageUrl} alt={product.name} />,
					document.getElementById(containerId)
				);
			} else {
				render(
					imageFallback,
					document.getElementById(containerId)
				);
			}
		})
		.catch(error => {
			console.error(error);
		});
};

export default ProductImage;
