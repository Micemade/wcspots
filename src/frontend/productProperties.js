import { render } from 'react-dom';
import apiFetch from '@wordpress/api-fetch';
import DOMPurify from 'dompurify';

const ProductProperties = (productIds, blockId) => {

	// Block instance by 'data-block-id' att.
	const thisBlock = document.querySelector(`[data-block-id="${blockId}"]`);
	const SanitizeHTML = DOMPurify.sanitize;

	// Prepare product ID's for query arg (array to string).
	const _productIds = productIds.map((item) => item.toString()).join(",");

	apiFetch({
		path: `/wc/store/v1/products/?include=${_productIds}&_fields=id,name,short_description,price_html,images,permalink`

	}).then((products) => {
		products.forEach((product) => {

			// Fetched product properties.
			const productId = product.id;
			const imageDefault = typeof wc === 'object' ? wc?.wcSettings?.PLACEHOLDER_IMG_SRC : null;
			const imgSrcSet = product.images && product.images.length > 0 ? product.images[0].srcset : imageDefault;
			const name = product.name ? product.name : null;
			const permalink = product.permalink ? product.permalink : '#';
			const description = product.short_description ? product.short_description : null;
			const priceHtml = product.price_html ? product.price_html : null;


			// Render elements.
			render(imgSrcSet ? <img srcSet={imgSrcSet} alt={name} /> : 'No product image', thisBlock.querySelector(`[data-product-image="${productId}"]`));
			render(<a href={permalink} title={name}>{name}</a>, thisBlock.querySelector(`[data-product-title="${productId}"]`));

			// Price HTML sanitized.
			render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(priceHtml) }} />, thisBlock.querySelector(`[data-product-price="${productId}"]`));
			render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(description) }} />, thisBlock.querySelector(`[data-product-excerpt="${productId}"]`));
		});


	}).catch((error) => {
		console.error(error);
	});

};


export default ProductProperties;
