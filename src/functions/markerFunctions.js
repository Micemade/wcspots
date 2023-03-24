/**
 * External dependecies.
 */
import { v4 as uuidv4 } from 'uuid'; // For creating unique id's.

/**
 * Adding markers when clicked on image (in div container)
 * captures click coordinates relative to image container
 * and adds marker to marker objects, with x,y and other properties.
 * 
 * @param {Event} event 
 * @param {Object} markers 
 * @param {Function} setAttributes 
 */
export const addNewMarker = (event, markers, setAttributes) => {
	const rect = event.target.getBoundingClientRect();
	const xPos = ((event.clientX - rect.left) / rect.width) * 100;
	const yPos = ((event.clientY - rect.top) / rect.height) * 100;
	const newMarker = {
		x: xPos,
		y: yPos,
		id: uuidv4(),
		name: 'Double click on marker to assign product.',
		active: true,
		productId: null,
		productTitle: null,
	};
	const updatedMarkers = markers?.concat(newMarker);
	setAttributes({ markers: updatedMarkers });
};

/**
 * When a marker is clicked, the modal opens to assign product to the marker.
 * @param {object} marker 
 * @param {Function} setAttributes 
 */
export const assignProductToMarker = (marker, setAttributes) => {
	setAttributes({ selectedMarker: marker.id });
	setAttributes({ editModal: true });
};

/**
 * Select product from products object and assign to marker.
 * Select component is in modal component.
 * @param {String} value 
 */
export const onProductSelect = (value, markers, selectedMarker, setAttributes) => {
	const [productId, productTitle] = JSON.parse(value);
	const updatedMarkers = markers?.map((marker) => {
		if (marker.id === selectedMarker) {
			return {
				...marker,
				productId,
				productTitle,
			};
		}
		return marker;
	});
	setAttributes({ markers: updatedMarkers });
	setAttributes({ selectedProduct: value });
	setAttributes({ editModal: false });
};

/**
 * Add 'highlight' class name to assigned product
 * @param {object} marker 
 */
export const onMarkerOver = (event, marker, clientId) => {
	const thisBlock = event.target.closest(".wp-block-micemade-woo-lookblock");
	const thisBlockId = thisBlock.dataset.block;

	const productId = marker?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.add('highlighted');
	}
}

/**
 * Remove highligt class name from assigned product.
 * @param {object} marker 
 */
export const onMarkerOut = (event, marker, clientId) => {
	const thisBlock = event.target.closest(".wp-block-micemade-woo-lookblock");
	const thisBlockId = thisBlock.dataset.block;

	const productId = marker?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.remove('highlighted');

	}
}

/* export const markerClick = (marker, setAttributes) => {
	const productId = marker?.productId;
	if (productId) {
		setAttributes({ showModal: true, copiedProduct: productId });
	}
} */