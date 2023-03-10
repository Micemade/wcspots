import { render } from 'react-dom';
import apiFetch from '@wordpress/api-fetch';
import DOMPurify from 'dompurify';

const ProductProperties = (productId) => {

	const sanitizer = DOMPurify.sanitize;
	apiFetch({
		path: `/wc/store/v1/products/${productId}?_fields=id,name,short_description,price_html,images,permalink`

	}).then((product) => {
		// Assign product properties to vars.
		const imageDefault = typeof wc === 'object' ? wc?.wcSettings?.PLACEHOLDER_IMG_SRC : null;
		const imgSrcSet = product.images && product.images.length > 0 ? product.images[0].srcset : imageDefault;
		const name = product.name ? product.name : null;
		const permalink = product.permalink ? product.permalink : '#';
		const description = product.short_description ? product.short_description : null;
		const priceHtml = product.price_html ? product.price_html : null;

		// Render elements.
		render(imgSrcSet ? <img srcSet={imgSrcSet} alt={product.name} /> : 'No product image', document.getElementById(`product-image-${productId}`));
		render(<a href={permalink} title={name}>{name}</a>, document.getElementById(`product-title-${productId}`));
		// Price HTML sanitized.
		render(<div dangerouslySetInnerHTML={{ __html: sanitizer(priceHtml) }} />, document.getElementById(`product-price-${productId}`));
		render(<div dangerouslySetInnerHTML={{ __html: sanitizer(description) }} />, document.getElementById(`product-excerpt-${productId}`));

	}).catch((error) => {
		console.error(error);
	});

};

export default ProductProperties;
