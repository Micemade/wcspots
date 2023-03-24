// import React from "react";
// import { render } from "react-dom";
// import ProductItem from "../components/productItem";

/**
 * Marker events.
 * @param {*} marker 
 */
const addMarkerEvents = (marker, lookBlockInstance) => {

	marker.addEventListener('mouseover', (event) => {
		const marker = event.target;
		const productId = marker.dataset.productId;
		const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);
		if (product) {
			product.classList.add('highlighted');
		};
	});

	marker.addEventListener('mouseleave', (event) => {
		const marker = event.target;
		const productId = marker.dataset.productId;
		const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);
		if (product) {
			product.classList.remove('highlighted');
		};
	});

	/* 	marker.addEventListener('click', (event) => {
			const marker = event.target;
			const productId = marker.dataset.productId;
	
			const modalContainer = document.createElement('div');
			modalContainer.setAttribute('id', 'modal-container');
			document.body.appendChild(modalContainer);
	
			render(
				<div>
					<ProductItem productId={productId} />
				</div>,
	
			);
		}) */

}

export default addMarkerEvents;



