/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * if DOMPurify doesn't sanitize:
 * import { createInterpolateElement } from '@wordpress/element'; // 
 * https://make.wordpress.org/core/2020/07/17/introducing-createinterpolateelement/
 */

/**
 * React and external dependencies.
 */
import { render } from 'react-dom';
import DOMPurify from 'dompurify';

/**
 * Internal dependencies.
 */
import addToCartPost from '../functions/addToCartPost';
import ProductAddToCart from '../components/productAddToCart';

const fetchRenderProducts = (productIds, blockId) => {

	// Block instance by 'data-block-id' att.
	const thisBlock = document.querySelector(`[data-block-id="${blockId}"]`);
	const SanitizeHTML = DOMPurify.sanitize;

	// Prepare product ID's for query arg (array to string).
	const _productIds = productIds.map((item) => item.toString()).join(",");

	apiFetch({
		path: `/wc/store/v1/products/?include=${_productIds}&_fields=id,name,short_description,price_html,images,permalink,add_to_cart, type`

	}).then((products) => {

		products.forEach((product) => {

			// Fetched product properties.
			const productId = product.id;
			const name = product.name ? product.name : null;
			const permalink = product.permalink ? product.permalink : '#';
			const description = product.short_description ? product.short_description : null;
			const priceHtml = product.price_html ? product.price_html : null;
			const addToCart = product.add_to_cart ? product.add_to_cart : null;
			const type = product.type ? product.type : null;

			// Product images.
			const hasImages = product.images && product.images.length > 0;
			const featuredImg = hasImages ? product.images[0] : null;
			const imgSrcSet = featuredImg?.srcset;
			const imgSizes = featuredImg?.sizes;
			const imgSrc = featuredImg?.src;
			const fallBack = typeof wc === 'object' ? wc.wcSettings?.PLACEHOLDER_IMG_SRC : (__('Product has no featured image', 'woohotspots'));

			const imageToRender = (imgSrcSet || imgSrc) ? <img {...(imgSrcSet ? { srcSet: imgSrcSet } : {})} src={imgSrc} alt={name} sizes="(max-width: 599px) 100vw, calc(100vw / 3)" /> : fallBack;

			/**
			 * Render elements.
			 */
			const imageContainer = thisBlock.querySelector(`[data-product-image="${productId}"]`);
			const titleContainer = thisBlock.querySelector(`[data-product-title="${productId}"]`);
			const priceContainer = thisBlock.querySelector(`[data-product-price="${productId}"]`);
			const excerptContainer = thisBlock.querySelector(`[data-product-excerpt="${productId}"]`);
			const addToCartContainer = thisBlock.querySelector(`[data-product-addtocart="${productId}"]`);

			// Product image.
			{
				imageContainer && (
					render(imageToRender, imageContainer)
				)
			}
			// Product title.
			{
				titleContainer && (
					render(<a href={permalink} title={name}>{name}</a>, titleContainer)
				)
			}
			// Price (HTML sanitized).
			{
				priceContainer && (
					render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(priceHtml) }} />, priceContainer)
				)
			}
			// Excerpt (HTML sanitized).
			{
				excerptContainer && (
					render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(description) }} />, excerptContainer)
				)
			}
			// Add to cart button.
			const addToCartClasses = "wp-block-button__link wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart";
			{
				addToCartContainer && (
					render(
						<>
							<a
								className={addToCartClasses}
								href={type !== 'simple' && (addToCart?.url)}
								title={addToCart?.description}
								onClick={() => {
									{ type === 'simple' && (addToCartPost(event, productId)) }
								}}
							>
								{addToCart?.text}
							</a>
							{type === 'simple' && (
								<small className='view-cart'></small>
							)}

						</>,
						addToCartContainer
					)
				)
			}
		});

	}).catch((error) => {
		console.error(error);
	});

};

export default fetchRenderProducts;
