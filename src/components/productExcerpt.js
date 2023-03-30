/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
/**
 * External dependencies.
 */
import DOMPurify from 'dompurify';
/**
 * Internal dependecies.
 */
import useProduct from './useProduct';


const ProductExcerpt = ({ productId }) => {
	const { product, loading } = useProduct(productId);
	const sanitizer = DOMPurify.sanitize;

	if (loading) {
		return <small>{__('Loading short description...', 'woo-lookblock')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	// Product price HTML sanitized.
	return <div dangerouslySetInnerHTML={{ __html: sanitizer(product.short_description) }} />

};

export default ProductExcerpt;