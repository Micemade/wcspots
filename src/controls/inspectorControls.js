/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import {
	FormTokenField,
	RangeControl,
	CardDivider,
	PanelBody,
	PanelRow,
	Button,
	IconButton,
	SelectControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';
import { InspectorControls, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';

// import Creatable from 'react-select/creatable';
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { useState } from 'react';

/**
 * Internal dependency - custom UnitRangeControl.
 */
import UnitRangeControl from './UnitRangeControl';
import ImageRadioSelectControl from './ImageRadioSelectControl';

/**
 * InspectorControlsComponent function.
 * @param {*} props 
 * @returns 
 */
const InspectorControlsComponent = ({ attributes, setAttributes }) => {
	// Get data for product post type.
	const getProducts = useEntityRecords('postType', 'product', {
		per_page: -1,
	});

	const {
		productList,
		productsData,
		mediaID,
		mediaURL,
		productsLayout,
		columns,
		productsGap,
		valign,
		imageWidth,
		flexLayout,
		flexGap,
		titleSize,
		priceSize,
		productPadding,
		productSpacing,
		titleColor,
		priceColor,
		markers,
		imageOption,
	} = attributes;

	/**
	 * FormTokenList functions
	 */
	const displayList = getProducts?.records
		?.filter((item) => productList?.includes(item.id))
		.map((item) => item.title.rendered);

	// FormTokenField suggestions.
	const suggestions = getProducts?.records?.map((stream) => {
		return stream.title.rendered;
	});
	// FormTokenField Adding / removing products.
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
					value: item.id,
					label: item.title.raw,
				}
			});

		setAttributes({ productList: newProductIds, products: newProducts, productsData: productsData });
	};

	const [newList, setNewList] = useState();
	const onChangeProduct = (newList) => {
		setNewList(newList);
		setAttributes({ productsData: newList })
	}

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

	// Flex gap size (custom 'UnitRangeControl' control )
	const handleFlexGapChange = (newSizeValue) => {
		setAttributes({ flexGap: { value: newSizeValue, unit: flexGap.unit } });
	};
	// Product padding size (custom 'UnitRangeControl' control )
	const handleproductPadding = (newSizeValue) => {
		setAttributes({ productPadding: { value: newSizeValue, unit: productPadding.unit } });
	};
	// Product spacing size (custom 'UnitRangeControl' control )
	const handleproductSpacing = (newSizeValue) => {
		setAttributes({ productSpacing: { value: newSizeValue, unit: productSpacing.unit } });
	};
	// Products gap (custom 'UnitRangeControl' control )
	const handleProductsGap = (newSizeValue) => {
		setAttributes({ productsGap: { value: newSizeValue, unit: productsGap.unit } });
	};
	// Product title size (custom 'UnitRangeControl' control )
	const handletitleSizeChange = (newSizeValue) => {
		setAttributes({ titleSize: { value: newSizeValue, unit: titleSize.unit } });
	};
	// Product price size (custom 'UnitRangeControl' control )
	const handlePriceSizeChange = (newSizeValue) => {
		setAttributes({ priceSize: { value: newSizeValue, unit: priceSize.unit } });
	};

	const layouts = [
		{
			value: 'layout1',
			label: 'Layout 1',
			image: require('./icons/Layout_1.png')
		},
		{
			value: 'layout2',
			label: 'Layout 2',
			image: require('./icons/Layout_2.png')
		},
	];

	const productsLayoutChange = (newSelectedOption) => {
		setAttributes({ productsLayout: newSelectedOption });
	};


	const productSettingsTabs = [
		{
			name: 'layout',
			title: 'Layout',
			content: (
				<div>

					<ImageRadioSelectControl
						label={__('Layout type', 'woo-lookblock')}
						help={__('Pick a grid type for displaying selected products', 'woo-lookblock')}
						options={layouts}
						value={productsLayout}
						onChange={productsLayoutChange}
					/>

					<RangeControl
						label={__('Columns', 'woo-lookblock')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: value })
						}
						min={1}
						max={4}
					/>
					<UnitRangeControl
						label={__('Products gap', 'woo-lookblock')}
						value={productsGap}
						onValueChange={handleProductsGap}
						onUnitChange={(newUnit) =>
							setAttributes({
								productsGap: { value: productsGap.value, unit: newUnit },
							})
						}
						customUnitOptions={null}
					/>
					<UnitRangeControl
						label={__('Elements spacing', 'woo-lookblock')}
						value={productSpacing}
						onValueChange={handleproductSpacing}
						onUnitChange={(newUnit) =>
							setAttributes({
								productSpacing: { value: productSpacing.value, unit: newUnit },
							})
						}
						customUnitOptions={null}
					/>
					<UnitRangeControl
						label={__('Product padding', 'woo-lookblock')}
						value={productPadding}
						onValueChange={handleproductPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								productPadding: { value: productPadding.value, unit: newUnit },
							})
						}
						customUnitOptions={null}
					/>
				</div>
			),
		},
		{
			name: 'fontSizes',
			title: 'Font sizes',
			content: (
				<div>
					<CardDivider size="xSmall" />
					<UnitRangeControl
						label={__('Product title size', 'woo-lookblock')}
						value={titleSize}
						onValueChange={handletitleSizeChange}
						onUnitChange={(newUnit) =>
							setAttributes({
								titleSize: { value: titleSize.value, unit: newUnit },
							})
						}
						customUnitOptions={
							[
								{ label: 'px', value: 'px' },
								{ label: 'em', value: 'em' },
								{ label: 'rem', value: 'rem' },
							]
						}
					/>
					<UnitRangeControl
						label={__('Price size', 'woo-lookblock')}
						value={priceSize}
						onValueChange={handlePriceSizeChange}
						onUnitChange={(newUnit) =>
							setAttributes({
								priceSize: { value: priceSize.value, unit: newUnit },
							})
						}
						customUnitOptions={
							[
								{ label: 'px', value: 'px' },
								{ label: 'em', value: 'em' },
								{ label: 'rem', value: 'rem' },
							]
						}
					/>

				</div>
			),
		},
		{
			name: 'colors',
			title: 'Colors',
			content: (

				<PanelColorSettings
					initialOpen={false}
					colorSettings={[
						{
							value: titleColor,
							onChange: (newValue) => setAttributes({ titleColor: newValue }),
							label: __('Title Color', 'woo-lookblock'),
						},
						{
							value: priceColor,
							onChange: (newValue) => setAttributes({ priceColor: newValue }),
							label: __('Price Color', 'woo-lookblock'),
						}
					]}
				/>

			)
		}
	];

	// For React Select component.
	const productOptions = getProducts?.records
		?.map((item) => {
			return {
				value: item.id,
				label: item.title.raw
			}
		});
	const animatedComponents = makeAnimated();

	return (
		<InspectorControls>
			<PanelBody
				title={__('Select products', 'woo-lookblock')}
				initialOpen={false}
			>

				<Select
					closeMenuOnSelect={false}
					components={animatedComponents}
					value={productsData}
					isMulti
					options={productOptions}
					onChange={onChangeProduct}
				/>

				<CardDivider />

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
				title={__('Lookbook image', 'woo-lookblock')}
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
								isSmall
								isSecondary
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
						label={__('Image options', 'woo-lookblock')}
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
				title={__('Lookbook layout', 'woo-lookblock')}
				initialOpen={false}
			>
				<SelectControl
					//label={__('Layout', 'woo-lookblock')}
					value={flexLayout}
					options={[
						{ label: 'Products left', value: 'row' },
						{ label: 'Image left', value: 'row-reverse' },
						{ label: 'Products on top', value: 'column' },
						{ label: 'Image on top', value: 'column-reverse', },
						{ label: 'Image only', value: 'image-only', },
					]}
					onChange={(value) =>
						setAttributes({ flexLayout: value })
					}
				/>

				<SelectControl
					label={__('Vertical align', 'woo-lookblock')}
					value={valign}
					options={[
						{ label: 'Top', value: 'flex-start' },
						{ label: 'Center', value: 'center' },
						{ label: 'Bottom', value: 'flex-end' },
					]}
					onChange={(value) => setAttributes({ valign: value })}
				/>
				<RangeControl
					label={__('Image width (%)', 'woo-lookblock')}
					value={imageWidth}
					min={0}
					max={100}
					onChange={(value) =>
						setAttributes({ imageWidth: value })
					}
				/>
				<UnitRangeControl
					label={__('Image/Products Gap', 'woo-lookblock')}
					value={flexGap}
					onValueChange={handleFlexGapChange}
					onUnitChange={(newUnit) =>
						setAttributes({
							flexGap: { value: flexGap.value, unit: newUnit },
						})
					}
					customUnitOptions={null}
				/>
			</PanelBody>

			<PanelBody
				title={__('Products settings', 'woo-lookblock')}
				initialOpen={false}
			>
				<TabPanel className="product-settings" tabs={productSettingsTabs}>
					{(tab) => (
						<div>
							{tab.content}
						</div>
					)}
				</TabPanel>

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
