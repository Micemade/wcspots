/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Flex, FlexItem, SelectControl, Modal } from '@wordpress/components';

/**
 * External dependecies.
 */
import { v4 as uuidv4 } from 'uuid'; // For creating unique id's.

// For server rendering in render.php
// import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies.
 */
import './editor.scss';
import ProductGrid from './components/productGrid';
import InspectorControlsComponent from './controls/inspectorControls';
import Marker from './components/marker';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

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
		selectedMarker,
		selectedProduct,
		isModalOpen,
	} = attributes;

	// Adding markers when clicked on image
	// click coordinates, relative to image container, get captured
	// and stored in of marker objects, with x,y and other properties.
	const handleImageClick = (event) => {
		const rect = event.target.getBoundingClientRect();
		const xPos = ((event.clientX - rect.left) / rect.width) * 100;
		const yPos = ((event.clientY - rect.top) / rect.height) * 100;
		const newMarker = {
			x: xPos,
			y: yPos,
			id: uuidv4(),
			name: 'Click on marker to assign product.',
			active: true,
			productId: null,
			productTitle: null,
		};
		const updatedMarkers = markers?.concat(newMarker);
		setAttributes({ markers: updatedMarkers });
	};

	// When a marker is clicked, the modal opens to assign product to the marker.
	const onMarkerClick = (marker) => {
		setAttributes({ selectedMarker: marker.id });
		setAttributes({ isModalOpen: true });
	};

	const onProductSelect = (value) => {
		const [productId, productTitle] = JSON.parse(value);
		const updatedMarkers = markers?.map((marker) => {
			if (marker.id === selectedMarker) {
				return {
					...marker,
					productId,
					productTitle,
				};
			}
			return marker;
		});
		setAttributes({ markers: updatedMarkers });
		setAttributes({ selectedProduct: value });
		setAttributes({ isModalOpen: false });
	};

	// Select options for modal, on marker click.
	const optionsStart = [{ label: 'Select a product', value: '' }];
	const options = products?.map((product) => ({
		label: product.title.rendered,
		value: JSON.stringify([product.id, product.title.rendered]),
	}));

	// If direction is 'column' or 'column-reverse' set align fixed.
	const styleFlex = (dir) => {
		// return dir.startsWith( 'column' ) ? { alignItems: 'center' } : {};
		return dir.substring(0, 6) == 'column' ? { alignItems: 'center' } : {};
	};
	return (
		<>
			<InspectorControlsComponent
				attributes={attributes}
				setAttributes={setAttributes}
			/>

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
							key="products-container"
							style={{ width: `${productsWidth}%` }}
							className="flex-block products-grid-container"
						>
							<ProductGrid
								products={products}
								columns={columns}
								gap={gap}
								context="edit"
							/>
						</FlexItem>
					)}

					{mediaURL && (
						<FlexItem
							key="image-container"
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
								onClick={handleImageClick}
							/>
							{markers?.length > 0 &&
								markers.map((marker, index) => (
									<Marker
										key={`marker-${marker.id}`}
										marker={marker}
										onClick={onMarkerClick}
									/>
								))}
						</FlexItem>
					)}
				</Flex>
			</div>
			{isModalOpen && (
				<Modal
					title={__(
						'Assign a product to this marker',
						'woo-lookblock'
					)}
					onRequestClose={() =>
						setAttributes({
							isModalOpen: false,
							selectedMarker: null,
						})
					}
				>
					<SelectControl
						label={__('Products', 'woo-lookblock')}
						value={
							selectedProduct
								? JSON.stringify([
									selectedProduct.id,
									selectedProduct.name,
								])
								: ''
						}
						options={optionsStart.concat(options)}
						onChange={onProductSelect}
					/>
				</Modal>
			)}
		</>
	);
}
