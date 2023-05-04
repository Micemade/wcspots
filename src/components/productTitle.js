import { __ } from '@wordpress/i18n';
import getProduct from '../functions/getProduct';

const ProductTitle = ({ productId }) => {
	const { product, loading } = getProduct(productId);

	if (loading) {
		return <small>{__('Loading product title...', 'woohotspots')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'woohotspots')}</div>;
	}

	return <a href={product.permalink}>{product.name}</a>;
};

export default ProductTitle;