/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { SelectControl, Modal, Spinner } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import './editor.scss';
import ProductGrid from './components/productGrid';
import InspectorControlsComponent from './controls/inspectorControls';
import Marker from './components/marker';

// Functions.
import { addNewMarker, assignProductToMarker, onProductSelect, onMarkerOver, onMarkerOut, markerClick } from './functions/markerFunctions';

/**
 * The edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ clientId, attributes, setAttributes }) => {

	const {
		id,
		products,
		productList,
		mediaURL,
		columns,
		productsGap,
		valign,
		imageWidth,
		flexLayout,
		flexGap,
		productsLayout,
		productSpacing,
		productPadding,
		titleSize,
		priceSize,
		titleColor,
		priceColor,
		markers,
		selectedMarker,
		selectedProduct,
		editModal,
		imageOption,
	} = attributes;

	// Set unique block ID using 'clientId'.
	useEffect(() => {
		if (0 === id.length || id !== clientId) {
			setAttributes({ id: clientId });
		}
	}, []);

	const blockProps = useBlockProps({ 'data-block-id': clientId, 'data-product-ids': JSON.stringify(productList) });

	// Product select options for modal, on marker click.
	const producOptionsStart = [{ label: 'Select a product', value: '' }];
	const producOptions = products?.map((product) => ({
		label: product.title.rendered,
		value: JSON.stringify([product.id, product.title.rendered]),
	}));


	// Block Flex container and product grid styles.
	const flexAlignItems = (dir) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
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
			<InspectorControlsComponent
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<div {...blockProps}>

				{(imageOption !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})` }}></div>)
				}

				<div className="flex-container" style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className="flex-block products-grid-container" style={productsContainerStyle}>

							<ProductGrid
								context="edit"
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
										// onClick={() => markerClick(marker, setAttributes)}
										onDoubleClick={() => assignProductToMarker(marker, setAttributes)}
										onMouseOver={onMarkerOver}
										onMouseOut={onMarkerOut}
										clientId={clientId}
									/>
								))}
						</div>
					)}
				</div>
			</div>
			{editModal && (
				<Modal
					title={__(
						'Assign a product to this marker',
						'woo-lookblock'
					)}
					onRequestClose={() =>
						setAttributes({
							editModal: false,
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
			)}

		</>
	);
}

export default Edit;
