/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';

/**
 * External dependencies.
 */
import { Popover as HotspotPopover } from 'react-tiny-popover';

/**
 * Internal dependencies
 */
import ProductTitle from '../components/productTitle';
import ProductImage from '../components/productImage';
import ProductPrice from '../components/productPrice';
import ProductExcerpt from '../components/productExcerpt';
import ProductAddToCart from '../components/productAddToCart';

const AddHotspotPopover = (props) => {

	const { assocProdId, parentElement, isEditing, popoverSettings } = props;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const togglePopover = () => {
		setIsPopoverOpen((state) => !state);
	};

	const {
		productsGap,
		productsLayout,
		productsAlign,
		elementsToggle,
		productSpacing,
		productPadding,
		titleSize,
		priceSize,
		excerptSize,
		addToCartSize,
		productBackColor,
		titleColor,
		priceColor,
		excerptColor
	} = popoverSettings;

	// Popover classes and styles.
	const popoverTogglerClass = {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderRadius: "50%",
		zIndex: "5"
	}

	const contentStyle = {
		padding: `${productsGap.value}${productsGap.unit}`,
		...productBackColor && { backgroundColor: productBackColor }
	}

	const spacing = {
		margin: `${productSpacing.value}${productSpacing.unit} 0`
	}

	const elementsStyle = {
		padding: `${productPadding.value}${productPadding.unit}`
	}

	const titleStyle = {
		fontSize: `${titleSize.value}${titleSize.unit}`,
		...titleColor && { color: titleColor }
	}

	const priceStyle = {
		fontSize: `${priceSize.value}${priceSize.unit}`,
		...priceColor && { color: priceColor }
	}

	const excerptStyle = {
		fontSize: `${excerptSize.value}${excerptSize.unit}`,
		...excerptColor && { color: excerptColor }
	}
	const addToCartStyle = {
		transform: `scale(${addToCartSize})`,
	}
	/*
	// 'parentElement' is undefined on front (edit.js useEffect solves it when in editor)
	let _parentElement = parentElement;
		if (typeof _parentElement === 'undefined') {
			_parentElement = document.body;
		}
	 */
	return (

		<HotspotPopover
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

						{elementsToggle.title && (
							<div className="product-title product-element" style={Object.assign(titleStyle, spacing)}>
								<h4><ProductTitle productId={assocProdId} /></h4>
							</div>
						)}

						{elementsToggle.price && (
							<div className="product-price product-element" style={Object.assign(priceStyle, spacing)}>
								<ProductPrice productId={assocProdId} />
							</div>
						)}

						{elementsToggle.excerpt && (
							<div className="product-excerpt product-element" style={Object.assign(excerptStyle, spacing)}>
								<ProductExcerpt productId={assocProdId} />
							</div>
						)}
						{elementsToggle.addToCart && (
							<div className="product-add-to-cart product-element" style={Object.assign(addToCartStyle, spacing)}>
								<ProductAddToCart productId={assocProdId} />
							</div>
						)}

					</div>
				</div>
			)}
		>
			<div className='popover-toggler' style={popoverTogglerClass} onClick={togglePopover} />

		</HotspotPopover>

	);
}
export default AddHotspotPopover;