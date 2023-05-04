/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Flex, FlexItem, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import './style.scss';
import ProductGrid from './components/productGrid';
import Hotspot from './components/hotspot';

const Save = ({ attributes }) => {

	const {
		id,
		productList,
		mediaURL,
		columns,
		productsGap,
		valign,
		imageWidth,
		flexLayout,
		flexGap,
		productsLayout,
		productPadding,
		productSpacing,
		titleSize,
		priceSize,
		titleColor,
		priceColor,
		hotspots,
		imageOption,
	} = attributes;

	const blockProps = useBlockProps.save({ 'data-block-id': id, 'data-product-ids': JSON.stringify(productList) });

	// Block Flex container and product grid styles.
	const flexAlignItems = (layout) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return layout.substring(0, 6) == 'column' ? 'center' : valign; // or layout.startsWith() ?
	};
	const flexContainerStyles = {
		flexDirection: (flexLayout == 'image-only') ? 'row' : flexLayout,
		alignItems: flexAlignItems(flexLayout),
		gap: `${flexGap.value}${flexGap.unit}`,
		justifyContent: 'center'
	}
	const productsContainerStyle = {
		width: (flexLayout.substring(0, 6) == 'column') ? `${imageWidth}%` : `${100 - imageWidth}%`
	}

	return (
		<>
			<div {...blockProps}>
				{(imageOption !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})` }}></div>)
				}

				<div className="flex-container" style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className="flex-block products-grid-container" style={productsContainerStyle}>

							<ProductGrid
								context="save"
								productList={productList}
								columns={columns}
								productsGap={productsGap}
								productsLayout={productsLayout}
								productPadding={productPadding}
								productSpacing={productSpacing}
								titleSize={titleSize}
								priceSize={priceSize}
								fontColors={{ titleColor, priceColor }}
							/>

						</div>
					)}

					{mediaURL && (
						<div className="flex-block image-container" style={{ width: `${imageWidth}%` }}>
							<img
								className="hotspot-image"
								src={mediaURL}
								alt={__('Lookbook image', 'woohotspots')}
							/>
							{hotspots?.length > 0 &&
								hotspots.map((hotspot, index) => (
									<Hotspot
										key={`hotspot-${index}`}
										hotspot={hotspot}
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
