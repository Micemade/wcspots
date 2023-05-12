import { __ } from '@wordpress/i18n';
import getProduct from '../functions/getProduct';
import DOMPurify from 'dompurify';


const ProductPrice = ({ productId }) => {
	const { product, loading } = getProduct(productId);
	const sanitizer = DOMPurify.sanitize;

	if (loading) {
		return <small>{__('Loading product price...', 'woo-hotspots')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-hotspots')}</div>;
	}

	// Product price HTML sanitized.
	return <div dangerouslySetInnerHTML={{ __html: sanitizer(product.price_html) }} />

};

export default ProductPrice;