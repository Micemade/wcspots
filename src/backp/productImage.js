import apiFetch from "@wordpress/api-fetch"
import { Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ProductImage = ({ productId }) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const product = await apiFetch({
					path: `/wc/store/v1/products/${productId}`,
				});
				setProduct(product);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		}

		fetchProduct();
	}, [productId]);

	if (loading) {
		return <Spinner />;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : null;
	const imageFallback = typeof wc == 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={product.name} />) : (__('Product has no featured image', 'woo-lookblock'));

	return imageUrl ? (
		<img src={imageUrl} alt={product.name} />
	) : (
		<div>{imageFallback}</div>
	);
};

export default ProductImage;