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

	const { assocProdId, parentElement, isEditing, popoverAtts } = props;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const togglePopover = () => {
		setIsPopoverOpen((state) => !state);
	};

	const {
		popoverWidth,
		popoverHeight,
		popoverPadding,
		productsLayout,
		productsAlign,
		elementsToggle,
		productSpacing,
		productPadding,
		imageSize,
		titleSize,
		priceSize,
		excerptSize,
		addToCartSize,
		productBackColor,
		titleColor,
		priceColor,
		excerptColor,
		roundCorners,
		arrowSize
	} = popoverAtts;

	// Popover classes and styles.
	const popoverTogglerClass = {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderRadius: "50%",
		zIndex: "5"
	}

	const popoverStyle = {
		width: `clamp(${popoverWidth.min},${popoverWidth.val},${popoverWidth.max})`,
		...popoverHeight && { height: popoverHeight }
	}

	const contentDivStyle = {
		...roundCorners && { borderRadius: roundCorners },
	}

	const arrowStyle = {
		borderWidth: arrowSize,
		...productBackColor && { borderColor: productBackColor }
	}

	const innerDivStyle = {
		...productsLayout !== 'layout3' && { padding: popoverPadding },
		...productBackColor && { backgroundColor: productBackColor },
	}

	const spacing = {
		margin: productSpacing
	}

	const elementsStyle = {
		padding: productPadding,
		// ...((productsLayout === 'layout2' || productsLayout === 'layout4') && { flexBasis: `calc( 100% - ${imageSize} )` }),
		...(productsLayout !== 'layout3' && { flexBasis: `calc( 100% - ${imageSize} )` })
	}

	const imageStyle = {
		// ...((productsLayout === 'layout2' || productsLayout === 'layout4') && { flexBasis: imageSize })
		...(productsLayout !== 'layout3' && { flexBasis: imageSize })
	}

	const titleStyle = {
		fontSize: titleSize,
		...titleColor && { color: titleColor }
	}

	const priceStyle = {
		fontSize: priceSize,
		...priceColor && { color: priceColor }
	}

	const excerptStyle = {
		fontSize: excerptSize,
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
			containerStyle={popoverStyle}
			content={({ position, nudgedLeft, nudgedTop }) => (
				<div className={`popover-content ${productsLayout}`} style={contentDivStyle}>

					<div
						className={`arrow ${position}`}
						style={Object.assign(arrowStyle, { marginLeft: -nudgedLeft, marginTop: -nudgedTop })} />

					<div
						className={`wcspots-product align-${productsAlign}`}
						style={innerDivStyle}
					>

						{productsLayout === 'layout3' && (
							<div className="overlay" style={{ background: productBackColor }} />
						)}

						{elementsToggle?.image && (
							<div className="product-featured-image" style={imageStyle}>
								<ProductImage productId={assocProdId} />
							</div>
						)}

						<div className="product-elements" style={elementsStyle}>

							{elementsToggle?.title && (
								<h4 className="product-title product-element" style={Object.assign(titleStyle, spacing)}>
									<ProductTitle productId={assocProdId} />
								</h4>
							)}

							{elementsToggle?.price && (
								<div className="product-price product-element" style={Object.assign(priceStyle, spacing)}>
									<ProductPrice productId={assocProdId} />
								</div>
							)}

							{elementsToggle?.excerpt && (
								<div className="product-excerpt product-element" style={Object.assign(excerptStyle, spacing)}>
									<ProductExcerpt productId={assocProdId} />
								</div>
							)}

							{elementsToggle?.addToCart && (
								<div className="product-add-to-cart product-element" style={Object.assign(addToCartStyle, spacing)}>
									<ProductAddToCart productId={assocProdId} />
								</div>
							)}

						</div>
					</div>
				</div>
			)}
		>
			<div className='popover-toggler' style={popoverTogglerClass} onClick={togglePopover} draggable />

		</HotspotPopover>

	);
}
export default AddHotspotPopover;