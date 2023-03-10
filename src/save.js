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
import Marker from './components/marker';

const Save = ({ attributes }) => {

	const blockProps = useBlockProps.save();

	const {
		products,
		productList,
		mediaURL,
		columns,
		gap,
		valign,
		productsWidth,
		direction,
		flexgap,
		markers,
		imageOption
	} = attributes;

	// Block Flex container and product grid styles.
	const flexAlignItems = (dir) => {
		// If direction is 'column' or 'column-reverse' set align fixed.
		return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
	};
	const flexContainerStyles = {
		flexDirection: direction,
		alignItems: flexAlignItems(direction),
		gap: flexgap,
		justifyContent: 'center'
	}
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${gap}px`,
	};

	return (
		<>

			<div {...blockProps}>
				{(imageOption !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})` }}></div>)
				}

				<div className="flex-container" style={flexContainerStyles}>

					<div className="flex-block products-grid-container" style={{ width: `${productsWidth}%` }}>

						<ProductGrid
							productList={productList}
							columns={columns}
							gap={gap}
							context="save"
							style={gridStyle}
						/>

					</div>

					{mediaURL && (
						<div className="flex-block image-container" style={{
							width: `${100 - productsWidth}%`,
							position: 'relative',
						}}>
							<img
								className="lookbook-image"
								src={mediaURL}
								alt={__('Lookbook image', 'woo-lookblock')}
							/>
							{markers?.length > 0 &&
								markers.map((marker, index) => (
									<Marker
										key={`marker-${index}`}
										marker={marker}
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
