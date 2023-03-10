/**
 * Marker events.
 * @param {*} marker 
 */
const addMarkerEvents = (marker) => {
	marker.addEventListener('mouseover', (event) => {
		const marker = event.target;
		const productId = marker.dataset.productId;
		const product = document.querySelector(`[data-product-id="${productId}"]`);
		if (product) {
			product.classList.add('highlighted');
		};
	});

	marker.addEventListener('mouseleave', (event) => {
		const marker = event.target;
		const productId = marker.dataset.productId;
		const product = document.querySelector(`[data-product-id="${productId}"]`);
		if (product) {
			product.classList.remove('highlighted');
		};
	});

}

export default addMarkerEvents;