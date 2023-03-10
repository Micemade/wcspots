import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import useProduct from './useProduct';

const ProductImage = ({ productId }) => {
	const { product, loading } = useProduct(productId);

	if (loading) {
		return <Spinner />;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	const imgSrcSet = product.images && product.images.length > 0 ? product.images[0].src : null;
	const imageFallback = typeof wc == 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={product.name} />) : (__('Product has no featured image', 'woo-lookblock'));

	return imgSrcSet ? (
		<img srcSet={imgSrcSet} alt={product.name} />
	) : (
		<div>{imageFallback}</div>
	);
};

export default ProductImage;
