/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';

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
		name: __('Double click on marker to assign a product.', 'woo-lookblock'),
		active: true,
		productId: null,
		productTitle: null,
		assigned: false
	};
	const updatedMarkers = markers?.concat(newMarker);
	setAttributes({ markers: updatedMarkers });
};

/**
 * When a marker is clicked, the modal opens to assign product to the marker.
 * @param {object} marker 
 * @param {Function} setAttributes 
 */
export const modalProductToMarker = (marker, setAttributes) => {
	setAttributes({ selectedMarker: marker.id });
	setAttributes({ selectedProduct: null });
	setAttributes({ editModal: true });
};

/**
 * Select product from products object and assign to marker.
 * Select component is in modal component.
 * @param {number} value 
 * @param {object} markers 
 * @param {string} selectedMarker 
 * @param {Function} setAttributes 
 */
export const onProductSelect = (value, markers, selectedMarker, setAttributes) => {
	const [productId, productTitle] = JSON.parse(value);
	const updatedMarkers = markers?.map((marker) => {
		if (marker.id === selectedMarker) {
			return {
				...marker,
				productId,
				productTitle,
				assigned: true
			};
		}
		return marker;
	});
	setAttributes({ markers: updatedMarkers });
	setAttributes({ selectedProduct: value });
	setAttributes({ selectedMarker: null });
	setAttributes({ editModal: false });
};


/**
 * Add 'highlight' class name to assigned product
 * @param {event} event 
 * @param {object} marker 
 * @param {string} clientId 
 */
export const onMarkerOver = (event, marker, clientId) => {
	// Get lookblock instance specific to this marker.
	const thisBlock = event.target.closest(".wp-block-micemade-woo-lookblock");
	// Bailing early.
	if (!thisBlock) return;

	const thisBlockId = thisBlock.dataset.block;
	const productId = marker?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.add('highlighted');
	}
}


/**
 * Remove highligt class name from assigned product.
 * @param {*} event 
 * @param {*} marker 
 * @param {*} clientId 
 */
export const onMarkerOut = (event, marker, clientId) => {
	// Get lookblock instance specific to this marker.
	const thisBlock = event.target.closest(".wp-block-micemade-woo-lookblock");
	// Bailing early.
	if (!thisBlock) return;

	const thisBlockId = thisBlock.dataset.block;
	const productId = marker?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.remove('highlighted');

	}
}

/**
 * Un-assign product to marker.
 * @param {object} markers 
 * @param {Function} setAttributes 
 * @param {string} markerId 
 */
export const unassignProduct = (markers, setAttributes, markerId) => {
	const updatedMarkers = markers?.map((marker) => {
		if (marker.id === markerId) {
			return {
				...marker,
				productId: null,
				productTitle: null,
				assigned: false
			};
		}
		return marker;
	});
	setAttributes({ markers: updatedMarkers });
}

/**
 * Delete marker.
 * @param {object} markers 
 * @param {Function} setAttributes 
 * @param {string} markerId 
 */
export const removeMarker = (markers, setAttributes, markerId) => {
	const updatedMarkers = markers.filter((marker) => {
		return markerId !== marker.id
	});

	setAttributes({ markers: updatedMarkers });
};
