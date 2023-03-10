/**
 * Internal dependencies.
 */
import ProductImage from './productImage';

document.addEventListener('DOMContentLoaded', () => {
	// Render product images
	const productItems = document.querySelectorAll('.product-featured-image');
	productItems.forEach(item => {
		const productId = item.dataset.productId;
		const containerId = `product-image-${productId}`;
		ProductImage(productId, containerId);
	});
});
