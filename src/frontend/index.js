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

	wooLookblockInstances.forEach((lookBlockInstance) => {

		const productIds = JSON.parse(lookBlockInstance.dataset.productIds);
		const blockId = lookBlockInstance.dataset.blockId;
		fetchRenderProducts(productIds, blockId);

		// Get every marker item.
		const productMarkers = lookBlockInstance.querySelectorAll('.product-marker');
		productMarkers.forEach((marker) => {

			AddMarkerEvents(marker, lookBlockInstance);
			// Popover on each marker.
			const eventsHolder = marker.getElementsByClassName('events-holder')[0];
			const assocProdId = marker.dataset.productId;
			if (assocProdId) {
				render(<AddMarkerPopover assocProdId={assocProdId} />, eventsHolder);
			}

		});
	});

});

