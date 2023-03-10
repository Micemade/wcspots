/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import {
	FormTokenField,
	RangeControl,
	PanelBody,
	PanelRow,
	Button,
	IconButton,
	SelectControl,
	ToggleControl
} from '@wordpress/components';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';

const InspectorControlsComponent = ({ attributes, setAttributes }) => {
	// Get data for product post type.
	const getProducts = useEntityRecords('postType', 'product', {
		per_page: -1,
	});

	const {
		productList,
		mediaID,
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

	// Display product titles in FormTokenField (value att).
	const displayList = getProducts?.records
		?.filter((item) => productList?.includes(item.id))
		.map((item) => item.title.rendered);

	// FormTokenField control suggestions.
	const suggestions = getProducts?.records?.map((stream) => {
		return stream.title.rendered;
	});
	// Adding / removing products.
	const onChangeProductList = (newList) => {
		const newProductIds = getProducts?.records
			?.filter((item) => newList.includes(item.title.rendered))
			.map((item) => item.id);

		const newProducts = getProducts?.records?.filter((item) =>
			newList.includes(item.title.rendered)
		);

		const productsData = getProducts?.records
			?.filter((item) => newList.includes(item.title.rendered))
			.map((item) => {
				return {
					id: item.id,
					title: item.title.raw,
					excerpt: item.excerpt.raw
				}
			});

		setAttributes({ productList: newProductIds, products: newProducts, productsData: productsData });
	};



	// IMAGE CONTROLS.
	const onSelectImage = (media) => {
		if (!clearMarkersOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id });
		}

	};
	const onRemoveImage = () => {
		if (!clearMarkersOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: null, mediaID: null });
		}

	};
	const clearMarkersOnImageChange = () => {
		if (markers.length > 0 && mediaID) {
			if (!confirm("All existing markers will be removed - are you sure?")) {
				return false;
			};
		}
		setAttributes({ markers: [] });
		return true;
	}

	// MARKER CONTROLS.
	const markerToggle = (markerIndex) => {
		const updatedMarkers = [...markers];
		updatedMarkers[markerIndex].active =
			!updatedMarkers[markerIndex].active;
		setAttributes({ markers: updatedMarkers });
	};

	const markerRemove = (markerIndex) => {
		const updatedMarkers = [...markers];
		updatedMarkers.splice(markerIndex, 1);
		setAttributes({ markers: updatedMarkers });
	};

	return (
		<InspectorControls>

			<PanelBody
				title={__('Select products', 'woo-lookbook')}
				initialOpen={true}
			>
				{getProducts.isResolving ? (
					__('Loading products list', 'woo-lookblock')
				) : (
					<FormTokenField
						label={__(
							'Start typing product name…',
							'woo-lookblock'
						)}
						value={displayList}
						suggestions={suggestions}
						onChange={onChangeProductList}
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__('Lookbook image', 'woo-lookbook')}
				initialOpen={false}
			>
				<PanelRow>
					<MediaUpload
						label={__(
							'Choose image for lookbook item',
							'woo-lookblock'
						)}
						onSelect={onSelectImage}
						allowedTypes="image"
						value={mediaID}
						render={({ open }) => (
							<Button
								className={
									mediaID
										? 'image-button'
										: 'button button-large'
								}
								onClick={open}
							>
								{!mediaID
									? __('Add Image', 'woo-lookblock')
									: __('Change Image', 'woo-lookblock')}
							</Button>
						)}
					/>
					{mediaID && (
						<PanelRow>
							<IconButton
								icon="trash"
								onClick={onRemoveImage}
								label={__('Remove image', 'woo-lookblock')}
							/>
						</PanelRow>
					)}
				</PanelRow>
				<PanelRow>
					{mediaID ? (
						<img
							src={mediaURL}
							alt={__(
								'Upload Lookbook image',
								'woo-lookblock'
							)}
						/>
					) : (
						__('No LookBook image selected', 'woo-lookblock')
					)}
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={__('Image options', 'woo-lookbook')}
						value={imageOption}
						options={[
							{ label: 'No background image', value: 'backimage-none' },
							{ label: 'Also as background', value: 'backimage-same' },
							{ label: 'Only as background', value: 'backimage-only' },
							{ label: 'Custom background image', value: 'backimage-custom' },
						]}
						onChange={(value) => setAttributes({ imageOption: value })}
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody
				title={__('Lookbook layout', 'woo-lookbook')}
				initialOpen={false}
			>
				<SelectControl
					label={__('Direction', 'woo-lookbook')}
					value={direction}
					options={[
						{ label: 'Row - products left', value: 'row' },
						{ label: 'Row - image left', value: 'row-reverse' },
						{ label: 'Column - products on top', value: 'column' },
						{
							label: 'Column - image on top',
							value: 'column-reverse',
						},
					]}
					onChange={(value) =>
						setAttributes({ direction: value })
					}
				/>
				<SelectControl
					label={__('Vertical align', 'woo-lookbook')}
					value={valign}
					options={[
						{ label: 'Top', value: 'flex-start' },
						{ label: 'Center', value: 'center' },
						{ label: 'Bottom', value: 'flex-end' },
					]}
					onChange={(value) => setAttributes({ valign: value })}
				/>
				<RangeControl
					label="Width"
					value={productsWidth}
					min={0}
					max={100}
					onChange={(value) =>
						setAttributes({ productsWidth: value })
					}
				/>
				<RangeControl
					label="Gap"
					value={flexgap}
					onChange={(value) =>
						setAttributes({ flexgap: value })
					}
					min={0}
					max={40}
				/>
			</PanelBody>
			<PanelBody
				title={__('Products layout', 'woo-lookbook')}
				initialOpen={false}
			>
				<RangeControl
					label="Columns"
					value={columns}
					onChange={(value) =>
						setAttributes({ columns: value })
					}
					min={1}
					max={4}
				/>
				<RangeControl
					label="Gap"
					value={gap}
					onChange={(value) => setAttributes({ gap: value })}
					min={0}
					max={40}
				/>
			</PanelBody>

			{mediaID && markers && (
				<PanelBody
					title={__('Product markers', 'woo-lookblock')}
					initialOpen={true}
				>
					{markers.map((marker, markerIndex) => (
						<div
							key={markerIndex}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'baseline',
							}}
						>
							<ToggleControl
								label={
									marker.productTitle
										? marker.productTitle
										: marker.name
								}
								checked={marker.active}
								onChange={() => markerToggle(markerIndex)}
							/>
							<IconButton
								icon="trash"
								onClick={() => markerRemove(markerIndex)}
								label={__('Remove marker', 'woo-lookblock')}
							/>
						</div>
					))}
					{markers.length > 0 && (
						<Button
							isSecondary
							isSmall
							onClick={() => setAttributes({ markers: [] })}
						>
							{__('Remove All Markers', 'woo-lookblock')}
						</Button>
					)}
					{markers.length == 0 && (<p>{__('Click on lookbook image to add markers', 'woo-lookblock')}</p>)}
				</PanelBody>
			)}

		</InspectorControls>
	);
};
export default InspectorControlsComponent;
