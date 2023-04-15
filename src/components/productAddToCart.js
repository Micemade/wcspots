/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import getProduct from '../functions/getProduct';


const ProductAddToCart = ({ productId }) => {
	const { product, loading } = getProduct(productId);

	if (loading) {
		return <small>{__('Loading...', 'woo-lookblock')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'woo-lookblock')}</div>;
	}

	const { text, description, url } = product.add_to_cart;

	const classNames = "wp-block-button__link wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart";

	// Product Add to cart HTML.
	return <a className={classNames} href={url} title={description}>{text}</a>

};

export default ProductAddToCart;