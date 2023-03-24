/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Flex, FlexItem } from '@wordpress/components';

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

	// console.log( attributes );
	// If direction is 'column' or 'column-reverse' set align fixed.
	const styleFlex = (dir) => {
		// return dir.startsWith( 'column' ) ? { alignItems: 'center' } : {};
		return dir.substring(0, 6) == 'column' ? { alignItems: 'center' } : {};
	};

	return (
		<>
			<div {...blockProps}>
				<Flex
					direction={direction}
					justify="center"
					align={valign}
					gap={flexgap}
					style={styleFlex(direction)}
				>
					{products && (
						<FlexItem
							key="products-container-front"
							className="flex-block products-grid-container"
							style={{ width: `${productsWidth}%` }}
						>
							<ProductGrid
								products={products}
								columns={columns}
								gap={gap}
								context="save"
							/>
						</FlexItem>
					)}

					{mediaURL && (
						<FlexItem
							key="image-container-front"
							className="flex-block image-container"
							style={{
								width: `${100 - productsWidth}%`,
								position: 'relative',
							}}
						>
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
						</FlexItem>
					)}
				</Flex>
			</div>
		</>
	);
};

export default Save;
