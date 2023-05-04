/**
 * Hotspot events.
 * @param {*} hotspot 
 */

const AddHotspotEvents = (hotspot, lookBlockInstance) => {

	hotspot.addEventListener('mouseover', (event) => {
		const hotspot = event.target;
		const productId = hotspot.dataset.productId;
		const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);
		if (product) {
			product.classList.add('highlighted');
		};
	});

	hotspot.addEventListener('mouseleave', (event) => {
		const hotspot = event.target;
		const productId = hotspot.dataset.productId;
		const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);

		if (product) {
			product.classList.remove('highlighted');
		};
	});

}

export default AddHotspotEvents;




