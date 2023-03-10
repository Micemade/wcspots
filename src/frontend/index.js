/**
 * Internal dependencies.
 */
import ProductProperties from "./productProperties";
import addMarkerEvents from "./markerEvents";

document.addEventListener('DOMContentLoaded', () => {
	// Get every product item.
	const productItems = document.querySelectorAll('.woo-lookblock-product');
	// Call ProductProperties to fetch products via WC Store API.
	productItems.forEach((item) => {
		const productId = item.dataset.productId;
		ProductProperties(productId);
	});

	// Get every marker item.
	const productMarkers = document.querySelectorAll('.product-marker');
	productMarkers.forEach((item) => {
		addMarkerEvents(item);
	});
});
