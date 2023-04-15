import { render } from 'react-dom';
import apiFetch from '@wordpress/api-fetch';
import DOMPurify from 'dompurify';
import { __ } from '@wordpress/i18n';

const fetchRenderProducts = (productIds, blockId) => {

	// Block instance by 'data-block-id' att.
	const thisBlock = document.querySelector(`[data-block-id="${blockId}"]`);
	const SanitizeHTML = DOMPurify.sanitize;

	// Prepare product ID's for query arg (array to string).
	const _productIds = productIds.map((item) => item.toString()).join(",");

	apiFetch({
		path: `/wc/store/v1/products/?include=${_productIds}&_fields=id,name,short_description,price_html,images,permalink,add_to_cart`

	}).then((products) => {

		products.forEach((product) => {

			// Fetched product properties.
			const productId = product.id;
			const name = product.name ? product.name : null;
			const permalink = product.permalink ? product.permalink : '#';
			const description = product.short_description ? product.short_description : null;
			const priceHtml = product.price_html ? product.price_html : null;
			const addToCart = product.add_to_cart ? product.add_to_cart : null;

			// Product images.
			const hasImages = product.images && product.images.length > 0;
			const imgSrcSet = hasImages ? product.images[0].srcset : null;
			const imgSrc = hasImages ? product.images[0].src : null;
			const fallBack = typeof wc === 'object' ? wc?.wcSettings?.PLACEHOLDER_IMG_SRC : (__('Product has no featured image', 'woo-lookblock'));

			const imageToRender = (imgSrcSet || imgSrc) ? <img {...(imgSrcSet ? { srcSet: imgSrcSet } : {})} src={imgSrc} alt={name} /> : fallBack;

			/**
			 * Render elements.
			 */
			// Product image.
			render(imageToRender, thisBlock.querySelector(`[data-product-image="${productId}"]`));
			// Product title.
			render(<a href={permalink} title={name}>{name}</a>, thisBlock.querySelector(`[data-product-title="${productId}"]`));

			// Price HTML sanitized.
			render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(priceHtml) }} />, thisBlock.querySelector(`[data-product-price="${productId}"]`));
			// Excerpt HTML sanitized.
			render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(description) }} />, thisBlock.querySelector(`[data-product-excerpt="${productId}"]`));

			// Add to cart button.
			const addToCartClasses = "wp-block-button__link wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart";
			render(<a className={addToCartClasses} href={addToCart.url} title={addToCart.description}>{addToCart.text}</a>, thisBlock.querySelector(`[data-product-addtocart="${productId}"]`));

		});


	}).catch((error) => {
		console.error(error);
	});

};


export default fetchRenderProducts;
