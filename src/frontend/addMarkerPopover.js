/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';
/**
 * External dependencies.
 */
import { Popover as MarkerPopover } from 'react-tiny-popover';
/**
 * Internal dependencies
 */
import ProductTitle from '../components/productTitle';
import ProductImage from '../components/productImage';
import ProductPrice from '../components/productPrice';
import ProductAddToCart from '../components/productAddToCart';

const AddMarkerPopover = (props) => {

	const { assocProdId, parentElement, isEditing, popoverStyle } = props;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const togglePopover = () => {
		setIsPopoverOpen((state) => !state);
	};

	const popoverTogglerClass = {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderRadius: "50%",
		zIndex: "5"
	}

	const contentStyle = {
		padding: `${popoverStyle.padding.value}${popoverStyle.padding.unit}`
	}

	const elementsStyle = {
		margin: `${popoverStyle.innerSpacing.value}${popoverStyle.innerSpacing.unit} 0`
	}

	/*
	// 'parentElement' is undefined on front (edit.js useEffect solves it when in editor)
	let _parentElement = parentElement;
		if (typeof _parentElement === 'undefined') {
			_parentElement = document.body;
		}
	 */
	return (

		<MarkerPopover
			parentElement={parentElement}
			isOpen={isPopoverOpen}
			onClickOutside={() => setIsPopoverOpen(isEditing)}
			// position={'bottom'} // preferred position
			positions={['bottom', 'top', 'left', 'right']}
			padding={30}
			reposition={true}
			align='center'
			content={(
				<div className='popover-content' style={contentStyle}>

					<ProductImage productId={assocProdId} />

					<div className='product-elements'>
						<div className="product-title product-element" style={elementsStyle}>
							<h4><ProductTitle productId={assocProdId} /></h4>
						</div>
						<div className="product-price product-element" style={elementsStyle}>
							<ProductPrice productId={assocProdId} />
						</div>
						<div className="product-add-to-cart product-element" style={elementsStyle}>
							<ProductAddToCart productId={assocProdId} />
						</div>
					</div>
				</div>
			)}
		>
			<div style={popoverTogglerClass} onClick={togglePopover} />
		</MarkerPopover>

	);
}
export default AddMarkerPopover;