/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl, Modal, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import './editor.scss';
import ProductGrid from './components/productGrid';
import InspectorControlsComponent from './controls/inspectorControls';
import Marker from './components/marker';

// Functions.
import { addNewMarker, assignProductToMarker, onProductSelect, onMarkerOver, onMarkerOut } from './functions/markerFunctions';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ attributes, setAttributes }) => {

	const blockProps = useBlockProps();

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
		selectedMarker,
		selectedProduct,
		isModalOpen,
		imageOption
	} = attributes;

	// Product select options for modal, on marker click.
	const producOptionsStart = [{ label: 'Select a product', value: '' }];
	const producOptions = products?.map((product) => ({
		label: product.title.rendered,
		value: JSON.stringify([product.id, product.title.rendered]),
	}));


	// Block Flex container and product grid styles.
	const flexAlignItems = (dir) => {
		// If direction is 'column' or 'column-reverse' set align fixed.
		return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
	};
	const flexContainerStyles = {
		flexDirection: direction,
		alignItems: flexAlignItems(direction),
		gap: flexgap,
		justifyContent: 'center',
	}
	const gridStyle = {
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gap: `${gap}px`,
	};

	return (
		<>
			<InspectorControlsComponent
				attributes={attributes}
				setAttributes={setAttributes}
			/>

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
							context="edit"
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
								onClick={() => addNewMarker(event, markers, setAttributes)}
							/>
							{markers?.length > 0 &&
								markers.map((marker, index) => (
									<Marker
										key={`marker-${marker.id}`}
										marker={marker}
										onDoubleClick={() => assignProductToMarker(marker, setAttributes)}
										onMouseOver={onMarkerOver}
										onMouseOut={onMarkerOut}
									/>
								))}
						</div>
					)}
				</div>
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
						options={producOptionsStart.concat(producOptions)}
						onChange={(value) => onProductSelect(value, markers, selectedMarker, setAttributes)}
					/>
				</Modal>
			)
			}
		</>
	);
}

export default Edit;
