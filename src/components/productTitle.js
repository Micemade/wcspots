import { __ } from '@wordpress/i18n';
import useProduct from './useProduct';

const ProductTitle = ({ productId }) => {
	const { product, loading } = useProduct(productId);

	if (loading) {
		return <small>{__('Loading product title...', 'woo-lookblock')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	return <a href={product.permalink}>{product.name}</a>;
};

export default ProductTitle;