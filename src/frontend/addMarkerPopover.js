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

	const { assocProdId, parentElement, isEditing, popoverSettings } = props;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const togglePopover = () => {
		setIsPopoverOpen((state) => !state);
	};

	// Popover classes and styles.
	const popoverTogglerClass = {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderRadius: "50%",
		zIndex: "5"
	}

	const contentStyle = {
		padding: `${popoverSettings.padding.value}${popoverSettings.padding.unit}`,
		...popoverSettings.productBackColor && { backgroundColor: popoverSettings.productBackColor }
	}

	const singleElementStyle = {
		margin: `${popoverSettings.innerSpacing.value}${popoverSettings.innerSpacing.unit} 0`
	}

	const elementsStyle = {
		padding: `${popoverSettings.innerPadding.value}${popoverSettings.innerPadding.unit}`
	}

	const titleStyle = {
		...popoverSettings.titleColor && { color: popoverSettings.titleColor }
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

					<div className='product-elements' style={elementsStyle}>

						<div className="product-title product-element" style={singleElementStyle}>
							<h4 style={titleStyle}><ProductTitle productId={assocProdId} /></h4>
						</div>

						<div className="product-price product-element" style={singleElementStyle}>
							<ProductPrice productId={assocProdId} />
						</div>

						<div className="product-add-to-cart product-element" style={singleElementStyle}>
							<ProductAddToCart productId={assocProdId} />
						</div>

					</div>
				</div>
			)}
		>
			<div className='popover-toggler' style={popoverTogglerClass} onClick={togglePopover} />

		</MarkerPopover>

	);
}
export default AddMarkerPopover;