import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getProduct from '../functions/getProduct';

const ProductImage = ({ productId }) => {
	const { product, loading } = getProduct(productId);

	if (loading) {
		return <Spinner />;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	const hasImages = product.images && product.images.length > 0;
	const imgSrcSet = hasImages ? product.images[0].srcset : null;
	const imgSrc = hasImages ? product.images[0].src : null;
	const fallback = typeof wc == 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={product.name} />) : (__('Product has no featured image', 'woo-lookblock'));

	return (imgSrcSet || imgSrc) ? (
		<img {...(imgSrcSet ? { srcSet: imgSrcSet } : {})} src={imgSrc} alt={product.name} />
	) : (
		<div>{fallback}</div>
	);
};

export default ProductImage;
