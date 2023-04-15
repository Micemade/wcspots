/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Flex, FlexItem, Spinner, Popover } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import './style.scss';
import ProductGrid from './components/productGrid';
import Marker from './components/marker';

const Save = ({ attributes }) => {

	const {
		id,
		productList,
		productsData,
		mediaURL,
		imageOption,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		imageWidth,
		valign,
		productsLayout,
		productsAlign,
		columns,
		productsGap,
		productPadding,
		productSpacing,
		titleSize,
		priceSize,
		addToCartSize,
		titleColor,
		priceColor,
		markers,
		popoverStyle
	} = attributes;

	// Array of selected product ID's for blocks 'data-product-ids' attribute.
	// Used for frontend rendering.
	const productIds = productsData.map((item) => {
		return item.value;
	});
	const blockProps = useBlockProps.save({
		'data-block-id': id,
		'data-product-ids': JSON.stringify(productIds),
		'data-popover-style': JSON.stringify(popoverStyle)
	});

	// Block Flex container and product grid styles.
	const flexAlignItems = (layout) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return layout.substring(0, 6) == 'column' ? 'center' : valign; // or layout.startsWith() ?
	};
	const flexContainerStyles = {
		alignItems: flexAlignItems(flexLayout),
		gap: `${flexGap.value}${flexGap.unit}`,
		justifyContent: 'center'
	}
	const flexContainerClasses = classNames(
		flexLayout,
		{ ['is-stacked-on-mobile ']: isStackedOnMobile }
	);
	// Flex items.
	const productsContainerStyle = {
		width: (flexLayout.substring(0, 6) == 'column') ? `${imageWidth}%` : `${100 - imageWidth}%`
	}
	const flexItemClasses = classNames({
		['is-stacked-on-mobile ']: isStackedOnMobile
	})

	return (
		<>
			<div {...blockProps}>
				{(imageOption !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})` }}></div>)
				}

				<div className={`${flexContainerClasses} flex-container`} style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className={`${flexItemClasses}flex-block products-grid-container`} style={productsContainerStyle}>

							<ProductGrid
								context="save"
								productList={productIds}
								columns={columns}
								productsGap={productsGap}
								productsLayout={productsLayout}
								productsAlign={productsAlign}
								productPadding={productPadding}
								productSpacing={productSpacing}
								titleSize={titleSize}
								priceSize={priceSize}
								addToCartSize={addToCartSize}
								fontColors={{ titleColor, priceColor }}
							/>

						</div>
					)}

					{mediaURL && (
						<div className={`${flexItemClasses}flex-block image-container`} style={{ width: `${imageWidth}%` }}>
							<img
								className="lookbook-image"
								src={mediaURL}
								alt={__('Lookbook image', 'woo-lookblock')}
							/>
							{markers?.length > 0 &&
								markers.filter((marker) => {
									if (!marker.productId) return false;
									return true;
								})
									.map((marker, index) => (

										<Marker
											key={`marker-${index}`}
											marker={marker}
											clientId={id}
										/>
									))}
						</div>
					)}

				</div>
			</div>
		</>
	);
};

export default Save;
