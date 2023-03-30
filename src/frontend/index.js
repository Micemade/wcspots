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

document.addEventListener('DOMContentLoaded', () => {

	// Get every Woo LookBlock instance.
	const wooLookblockInstances = document.querySelectorAll('.wp-block-micemade-woo-lookblock');

	wooLookblockInstances.forEach((lookBlockInstance) => {

		const productIds = JSON.parse(lookBlockInstance.dataset.productIds);
		const blockId = lookBlockInstance.dataset.blockId;
		ProductProperties(productIds, blockId);

		// Create popover container.
		const popover = document.createElement('div');
		popover.classList.add('woo-lookblock-popover');
		popover.setAttribute('id', `popover-${blockId}`);
		document.body.appendChild(popover);

		// Get every marker item.
		const productMarkers = lookBlockInstance.querySelectorAll('.product-marker');
		productMarkers.forEach((item) => {
			addMarkerEvents(item, lookBlockInstance);
		});
	});

});

