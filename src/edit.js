/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, MediaPlaceholder, MediaUpload, RichText } from '@wordpress/block-editor';
import { SelectControl, Modal, Button, ToolbarGroup, ToolbarButton, DropdownMenu } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * External dependecies.
 */
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import './editor.scss';
import ProductGrid from './components/productGrid';
import InspectorControlsComponent from './controls/inspectorControls';
import Marker from './components/marker';

// Functions.
import { addNewMarker, modalProductToMarker, onProductSelect, onMarkerOver, onMarkerOut, unassignProduct, removeMarker, clearMarkersOnImageChange } from './functions/markerFunctions';

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
		title,
		productsData,
		media,
		srcSetAtt,
		sizesAtt,
		mediaURL,
		mediaID,
		imageOption,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		flexItemsRatio,
		valign,
		productsLayout,
		productsAlign,
		columns,
		productsGap,
		productSpacing,
		productPadding,
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
		selectedMarker,
		selectedProduct,
		editModal,
		popoverSettings
	} = attributes;

	const productSettings = { productsLayout, productsAlign, columns, elementsToggle, productsGap, productSpacing, productPadding, titleSize, priceSize, excerptSize, addToCartSize, productBackColor, titleColor, priceColor, excerptColor }

	// Set Popover (React Tiny Popover) parent element in Editor.
	const [popoverParent, setPopoverParent] = useState();
	useEffect(() => {
		const popoverParentDesktop = document.getElementsByClassName('editor-styles-wrapper')[0];
		const iframe = document.querySelector('[name="editor-canvas"]');
		const popoverParentMobile = iframe ? iframe.contentDocument.getElementsByClassName('editor-styles-wrapper')[0] : null;
		const _popoverParent = popoverParentMobile ? popoverParentMobile : popoverParentDesktop;
		setPopoverParent(_popoverParent);
	}, []);



	// Set unique block ID using 'clientId' (For duplicating block).
	useEffect(() => {
		if (0 === id.length || id !== clientId) {
			setAttributes({ id: clientId });
		}
	}, []);

	// Array of selected product ID's for blocks 'data-product-ids' attribute (frontend rendering).
	const productIds = productsData.map((item) => {
		return item.value;
	});
	const blockProps = useBlockProps({
		'data-block-id': clientId,
		'data-product-ids': JSON.stringify(productIds),
		'data-popover-settings': JSON.stringify(popoverSettings)
	});

	// Modal products select options, on marker double click.
	const productOptionsStart = [{ value: '', label: 'Select a product' }];
	const productOptionsPrepare = productsData.map((item) => ({
		label: item.label,
		value: JSON.stringify([item.value, item.label]),
	}));
	const productOptions = productOptionsStart.concat(productOptionsPrepare);


	// STYLES AND CLASSES for block Flex container and product grid.
	const flexAlignItems = (dir) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
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


	// Image controls in Block toolbar.
	const onSelectImage = (media) => {
		if (!clearMarkersOnImageChange(markers, mediaID, setAttributes)) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id, media: media });
		}
	};
	const onRemoveImage = () => {
		if (!clearMarkersOnImageChange(markers, mediaID, setAttributes)) {
			return;
		} else {
			setAttributes({ mediaURL: null, mediaID: null });
		}
	};
	const onUploadError = (error) => {
		console.error('Media upload error:', error);
	};
	const imageControls = (
		<ToolbarGroup>
			{/* <DropdownMenu
				icon="edit"
				label="Image Settings"
				controls={[
					{
						icon: 'edit',
						title: 'Change image',
						onClick: () => {
							// return ();
						},
					},
				]}
			/> */}

			<MediaUpload
				onSelect={onSelectImage}
				onError={onUploadError}
				allowedTypes={['image']}
				value={mediaID}
				render={({ open }) => (
					<ToolbarButton
						icon="edit"
						title="Replace Image"
						onClick={open}
					/>
				)}
			/>

			<ToolbarButton
				icon="no-alt"
				label="Remove Image"
				onClick={onRemoveImage}
			/>
		</ToolbarGroup>
	);


	return (
		<>

			<BlockControls>
				{mediaURL && imageControls}
			</BlockControls>

			<InspectorControlsComponent
				attributes={attributes}
				setAttributes={setAttributes}
			/>

			<div {...blockProps}>

				{(imageOption !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})` }}></div>)
				}

				<RichText
					tagName="h2"
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					placeholder={__('Add Lookblock title…', 'woo-lookblock')}
				/>

				<div className={`${flexContainerClasses} flex-container`} style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className={`${flexItemClasses}flex-block products-grid-container`} style={productsContainerStyle}>

							<ProductGrid
								context="edit"
								productList={productIds}
								columns={columns}
								productsGap={productsGap}
								productsLayout={productsLayout}
								productsAlign={productsAlign}
								productPadding={productPadding}
								productSpacing={productSpacing}
								elementsToggle={elementsToggle}
								titleSize={titleSize}
								priceSize={priceSize}
								addToCartSize={addToCartSize}
								productBackColor={productBackColor}
								fontColors={{ titleColor, priceColor, excerptColor }}
							/>

						</div>
					)}

					<div className={`${flexItemClasses}flex-block image-container`} style={{ width: `${flexItemsRatio}%` }}>
						{!mediaURL && (
							<MediaPlaceholder
								icon="format-image"
								onSelect={onSelectImage}
								onSelectURL={onSelectImage}
								allowedTypes={['image']}
								labels={{
									title: __('Add lookbook image', 'woo-lookblock'),
									instructions: __('Drag & drop or select an image file', 'woo-lookblock'),
								}}
							/>
						)}
						{mediaURL && (
							<img
								className="lookbook-image"
								src={mediaURL}
								srcSet={srcSetAtt}
								sizes={sizesAtt}
								alt={__('Lookbook image', 'woo-lookblock')}
								onClick={() => addNewMarker(event, markers, setAttributes)}
							/>
						)}

						{markers?.length > 0 &&
							markers.map((marker, index) => (
								<Marker
									key={`marker-${marker.id}`}
									marker={marker}
									// onClick={() => markerClick(marker, setAttributes)}
									onDoubleClick={() => modalProductToMarker(marker, setAttributes)}
									onMouseOver={onMarkerOver}
									onMouseOut={onMarkerOut}
									clientId={clientId}
									unassignProduct={unassignProduct}
									removeMarker={removeMarker}
									markers={markers}
									setAttributes={setAttributes}
									popoverSettings={popoverSettings}
									popoverParent={popoverParent}
									context="edit"
								/>
							))}
						{(markers?.length == 0 && mediaURL) && (
							<div className='add-some-markers'>
								{__('Click on lookbook image to add markers.', 'woo-lookblock')}
							</div>
						)}
					</div>

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
						options={productOptions}
						onChange={(value) => {
							onProductSelect(value, markers, selectedMarker, setAttributes);
						}}
					/>
				</Modal>
			)}

		</>
	);
}

export default Edit;
