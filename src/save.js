/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Flex, FlexItem, Spinner, Popover } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import './style.scss';
import ProductGrid from './components/productGrid';
import Marker from './components/marker';
import LookBlockTitle from './components/LookblockTitle';

const Save = ({ attributes }) => {

	const {
		id,
		title,
		settingsTitleDesc,
		description,
		productsData,
		media,
		srcSetAtt,
		sizesAtt,
		mediaURL,
		backImage,
		backimageOpacity,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		flexItemsRatio,
		valign,
		productsLayout,
		productsAlign,
		columns,
		productsGap,
		productPadding,
		productSpacing,
		elementsToggle,
		titleSize,
		priceSize,
		excerptSize,
		addToCartSize,
		productBackColor,
		titleColor,
		priceColor,
		excerptColor,
		markers,
		usePopoverCustomSettings,
		popoverSettings
	} = attributes;

	/**
	 * Apply product style settings to Popover.
	 * properties are same for product elements and for popover elements.
	 * The 'productGap' for products is used as 'padding' popover property.
	 */
	const productSharedSettings = { productsGap, productsLayout, productsAlign, elementsToggle, productSpacing, productPadding, titleSize, priceSize, excerptSize, addToCartSize, productBackColor, titleColor, priceColor, excerptColor }
	const popSettings = usePopoverCustomSettings ? popoverSettings : productSharedSettings;

	// Array of selected product ID's for blocks 'data-product-ids' attribute.
	// Used for frontend rendering.
	const productIds = productsData.map((item) => {
		return item.value;
	});
	const blockProps = useBlockProps.save({
		'data-block-id': id,
		'data-product-ids': JSON.stringify(productIds),
		'data-popover-settings': JSON.stringify(popSettings)
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
		width: (flexLayout.substring(0, 6) == 'column') ? `${flexItemsRatio}%` : `${100 - flexItemsRatio}%`
	}
	const flexItemClasses = classNames({
		['is-stacked-on-mobile ']: isStackedOnMobile
	})

	return (
		<>
			<div {...blockProps}>
				{(backImage !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})`, opacity: backimageOpacity }}></div>)
				}

				{title && settingsTitleDesc.activeTitle && (
					<LookBlockTitle
						attributes={attributes}
						style={{ margin: `${settingsTitleDesc.spacingTitle} 0` }} />
				)}

				{settingsTitleDesc.activeDesc && (
					<RichText.Content
						tagName="p"
						value={description}
						style={{
							textAlign: settingsTitleDesc.align,
							margin: `${settingsTitleDesc.spacingDesc} 0`
						}} />
				)}

				<div className={`${flexContainerClasses} flex-container`} style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className={`${flexItemClasses}flex-block products-grid-container`} style={productsContainerStyle}>

							<ProductGrid
								context="save"
								productList={productIds}
								columns={productsData.length <= columns ? productsData.length : columns}
								productsGap={productsGap}
								productsLayout={productsLayout}
								productsAlign={productsAlign}
								productPadding={productPadding}
								productSpacing={productSpacing}
								elementsToggle={elementsToggle}
								titleSize={titleSize}
								priceSize={priceSize}
								excerptSize={excerptSize}
								addToCartSize={addToCartSize}
								productBackColor={productBackColor}
								fontColors={{ titleColor, priceColor, excerptColor }}
							/>

						</div>
					)}

					{mediaURL && (
						<div className={`${flexItemClasses}flex-block image-container`} style={{ width: `${flexItemsRatio}%` }}>
							<img
								className="lookbook-image"
								src={mediaURL}
								srcSet={srcSetAtt}
								sizes={sizesAtt}
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
