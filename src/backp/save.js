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
		mediaURL,
		columns,
		gap,
		valign,
		productsWidth,
		direction,
		flexgap,
		markers,
	} = attributes;

	// If direction is 'column' or 'column-reverse' set align fixed.
	const flexAlignItems = (dir) => {
		// return dir.startsWith( 'column' ) ? { alignItems: 'center' } : {};
		return dir.substring(0, 6) == 'column' ? 'center' : valign;
	};
	const flexContainerStyles = {
		flexDirection: direction,
		alignItems: flexAlignItems(direction),
		gap: flexgap,
		justifyItems: 'center'
	}

	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${gap}px`,
	};


	return (
		<>

			<div {...blockProps}>
				<div className="flex-container" style={flexContainerStyles}>

					<div className="flex-block products-grid-container" style={{ width: `${productsWidth}%` }}>

						<ProductGrid
							products={products}
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
