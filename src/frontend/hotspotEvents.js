/**
 * Hotspot events.
 * @param {*} hotspot 
 */

const AddHotspotEvents = (hotspot, lookBlockInstance) => {

	const productId = hotspot.dataset.productId;
	const primColor = hotspot.dataset.primcolor;
	const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);

	if (product) {
		hotspot.addEventListener('mouseover', (event) => {

			product.classList.add('highlighted');
			product.style.setProperty('--highlight-color', `${primColor}`);
		});

		hotspot.addEventListener('mouseleave', (event) => {
			product.classList.remove('highlighted');
			// product.style.setProperty('--highlight-color', '');
		});
	}
}

export default AddHotspotEvents;
