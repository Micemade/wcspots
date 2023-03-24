/**
 * Internal dependencies.
 */
import ProductProperties from "./productProperties";
import addMarkerEvents from "./markerEvents";

/**
 * WordPress dependencies.
 */
/* 
// TODO: responsive.
import { select } from '@wordpress/data';
import { store } from '@wordpress/viewport';
window.addEventListener('resize', (event) => {
	const isSmall = select(store).isViewportMatch('< large');
	console.log(isSmall)
}, true);
 */

/* document.addEventListener('DOMContentLoaded', () => {
	// Get every product item.
	const productItems = document.querySelectorAll('.woo-lookblock-product');
	// Call ProductProperties to fetch products via WC Store API.
	productItems.forEach((item) => {
		const productId = item.dataset.productId;
		ProductProperties(productId);
	});
});
 */

document.addEventListener('DOMContentLoaded', () => {
	// Get all block elements.
	const wooLookblockInstances = document.querySelectorAll('.wp-block-micemade-woo-lookblock');
	wooLookblockInstances.forEach((lookBlockInstance) => {

		const productIds = JSON.parse(lookBlockInstance.dataset.productIds);
		const blockId = lookBlockInstance.dataset.blockId;
		ProductProperties(productIds, blockId);

		// Get every marker item.
		const productMarkers = lookBlockInstance.querySelectorAll('.product-marker');
		productMarkers.forEach((item) => {
			addMarkerEvents(item, lookBlockInstance);
		});
	});

});

