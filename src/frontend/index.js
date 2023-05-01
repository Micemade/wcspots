import { render } from "react-dom";

/**
 * Internal dependencies.
 */
import fetchRenderProducts from "./fetchRenderProducts";
import AddMarkerEvents from "./markerEvents";
import AddMarkerPopover from "./addMarkerPopover";

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

	wooLookblockInstances.forEach((blockInstance) => {

		// Block datasets.
		const productIds = JSON.parse(blockInstance.dataset.productIds);
		const blockId = blockInstance.dataset.blockId;
		const popoverSettings = blockInstance.dataset.popoverSettings;

		// Look for products container to render products (for the only image with markers case) .
		const productsContainer = blockInstance.getElementsByClassName('products-grid-container');
		if (productsContainer.length > 0) {
			fetchRenderProducts(productIds, blockId);
		}

		// Get every marker item.
		const productMarkers = blockInstance.querySelectorAll('.product-marker');
		productMarkers.forEach((marker) => {

			const assocProdId = marker.dataset.productId;

			// Popover on each marker.
			const eventsHolder = marker.getElementsByClassName('events-holder')[0];
			if (assocProdId) {
				render(<AddMarkerPopover assocProdId={assocProdId} popoverSettings={JSON.parse(popoverSettings)} />, eventsHolder);
			}

			// Marker highlighting product on hover.
			AddMarkerEvents(marker, blockInstance);

		});
	});

});
