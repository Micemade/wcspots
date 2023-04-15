/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import {
	// FormTokenField,
	RangeControl,
	CardDivider,
	PanelBody,
	PanelRow,
	Button,
	IconButton,
	SelectControl,
	ToggleControl,
	TabPanel
} from '@wordpress/components';
import { InspectorControls, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';


/**
 * External dependencies (React components).
 * React select is replacement for FormTokenField Gutenberg component.
 */
// import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

/**
 * Internal dependencies - custom UnitRangeControl, ImageRadioSelectControl components.
 * Built from Gutenberg components.
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
		imageOption,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		imageWidth,
		valign,
		productsLayout,
		productsAlign,
		columns,
		productsGap,
		productPadding,
		productSpacing,
		titleSize,
		priceSize,
		addToCartSize,
		titleColor,
		priceColor,
		markers,
		popoverStyle
	} = attributes;


	/**
	 * FormTokenList functions
	 
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
	*/

	const onChangeProduct = (newList) => {
		markerAssignedRemove(newList);
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

	/**
	 * MARKER CONTROLS.
	 */
	// Activate/deactivate marker.
	const markerToggle = (markerIndex) => {
		const updatedMarkers = [...markers];
		updatedMarkers[markerIndex].active =
			!updatedMarkers[markerIndex].active;
		setAttributes({ markers: updatedMarkers });
	};
	// Delete marker.
	const markerRemove = (markerIndex) => {
		const updatedMarkers = [...markers];
		updatedMarkers.splice(markerIndex, 1);
		setAttributes({ markers: updatedMarkers });
	};
	// Remove marker if assigned product is removed.
	const markerAssignedRemove = (productDataUpdated) => {
		// .some will keep the items in array matching the criteria (marker not assigned  or matching prod id's)
		const filteredMarkers = markers.filter((marker) =>
			!marker.assigned || productDataUpdated.some((productDataItem) => productDataItem.value === marker.productId)
		);
		setAttributes({ markers: filteredMarkers });
	}


	// Flex gap size (custom 'UnitRangeControl' control )
	const handleFlexGapChange = (newValue) => {
		setAttributes({ flexGap: { value: newValue, unit: flexGap.unit } });
	};
	// Product padding size (custom 'UnitRangeControl' control )
	const handleproductPadding = (newValue) => {
		setAttributes({ productPadding: { value: newValue, unit: productPadding.unit } });
	};
	// Product spacing size (custom 'UnitRangeControl' control )
	const handleproductSpacing = (newValue) => {
		setAttributes({ productSpacing: { value: newValue, unit: productSpacing.unit } });
	};
	// Products gap (custom 'UnitRangeControl' control )
	const handleProductsGap = (newValue) => {
		setAttributes({ productsGap: { value: newValue, unit: productsGap.unit } });
	};
	// Product title size (custom 'UnitRangeControl' control )
	const handletitleSizeChange = (newValue) => {
		setAttributes({ titleSize: { value: newValue, unit: titleSize.unit } });
	};
	// Product price size (custom 'UnitRangeControl' control )
	const handlePriceSizeChange = (newValue) => {
		setAttributes({ priceSize: { value: newValue, unit: priceSize.unit } });
	};

	// Popover settings.
	// Padding (custom 'UnitRangeControl' control )
	const handlePopoverPadding = (newValue) => {
		setAttributes({
			popoverStyle: {
				...popoverStyle,
				padding: { value: newValue, unit: popoverStyle.padding.unit },
			}
		});
	};
	// Spacing for title, price, AddToCart ... (custom 'UnitRangeControl' control )
	const handlePopoverInnerSpacing = (newValue) => {
		setAttributes({
			popoverStyle: {
				...popoverStyle,
				innerSpacing: { value: newValue, unit: popoverStyle.innerSpacing.unit }
			}
		});
	};

	// Product layouts.
	const productsLayoutChange = (selectedLayout) => {
		setAttributes({ productsLayout: selectedLayout });
	};
	const productsAlignChange = (selectedAlign) => {
		setAttributes({ productsAlign: selectedAlign });
	};



	const productLayoutTabs = [
		{
			name: 'layout',
			title: 'Layout type',
			content: (
				<div>
					<ImageRadioSelectControl
						label={__('Product layout type', 'woo-lookblock')}
						help={__('Pick a grid type for displaying selected products', 'woo-lookblock')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/Layout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/Layout_2.png') },
						]}
						value={productsLayout}
						onChange={productsLayoutChange}
						height='28px'
					/>
					<ImageRadioSelectControl
						label={__('Product align', 'woo-lookblock')}
						help={__('How to align the products', 'woo-lookblock')}
						options={[
							{ value: 'flex-start', label: 'Flex start', icon: 'align-left' },
							{ value: 'center', label: 'Center', icon: 'align-center' },
							{ value: 'flex-end', label: 'Flex end', icon: 'align-right' },
						]}
						value={productsAlign}
						onChange={productsAlignChange}
						height='28px'
					/>

					<CardDivider />

					<RangeControl
						label={__('Columns', 'woo-lookblock')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: value })
						}
						min={1}
						max={4}
					/>

				</div>
			),
		},
		{
			name: 'layoutSpacing',
			title: 'Spacing',
			content: (
				<div>
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
			)
		}
	];
	const productStyleTabs = [
		{
			name: 'productSizes',
			title: 'Sizes',
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
					<RangeControl
						label={__('Add to Cart size', 'woo-lookblock')}
						value={addToCartSize}
						onChange={(value) =>
							setAttributes({ addToCartSize: value })
						}
						min={0.5}
						max={2}
						step={0.05}
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
				icon={'store'}
				title={__('Select products', 'woo-lookblock')}
				initialOpen={true}
			>
				{/* 
				<FormTokenField
					label={__(
						'Start typing product name…',
						'woo-lookblock'
					)}
					value={displayList}
					suggestions={suggestions}
					onChange={onChangeProductList}
				/>
				*/}
				<CardDivider />

				{getProducts.isResolving ? (
					__('Loading products list', 'woo-lookblock')
				) : (
					<Select
						closeMenuOnSelect={false}
						components={animatedComponents}
						value={productsData}
						isMulti
						options={productOptions}
						onChange={onChangeProduct}
					/>
				)}
			</PanelBody>

			<PanelBody
				icon={'format-image'}
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
									: __('Replace Image', 'woo-lookblock')}
							</Button>
						)}
					/>
					{mediaID && (
						<PanelRow>
							<IconButton
								icon="no-alt"
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
							{ label: 'Also as a background', value: 'backimage-same' },
							{ label: 'Custom background image', value: 'backimage-custom' },
						]}
						onChange={(value) => setAttributes({ imageOption: value })}
					/>
				</PanelRow>
			</PanelBody>

			<PanelBody
				icon={'layout'}
				title={__('Lookbook layout', 'woo-lookblock')}
				initialOpen={false}
			>

				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Stack on mobile', 'woo-lookblock')}
					checked={isStackedOnMobile}
					onChange={() =>
						setAttributes({ isStackedOnMobile: !isStackedOnMobile })
					}
				/>

				<SelectControl
					//label={__('Layout', 'woo-lookblock')}
					value={flexLayout}
					options={[
						{ label: 'Row - products first', value: 'row' },
						{ label: 'Row - image first', value: 'row-reverse' },
						{ label: 'Column - products first', value: 'column' },
						{ label: 'Column - image first', value: 'column-reverse', },
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
				icon={'products'}
				title={__('Product layout', 'woo-lookblock')}
				initialOpen={false}
			>
				<TabPanel className="product-settings" tabs={productLayoutTabs}>
					{(tab) => (
						<div>
							{tab.content}
						</div>
					)}
				</TabPanel>

			</PanelBody>

			<PanelBody
				icon={'store'}
				title={__('Product styles', 'woo-lookblock')}
				initialOpen={false}
			>
				<TabPanel className="product-settings" tabs={productStyleTabs}>
					{(tab) => (
						<div>
							{tab.content}
						</div>
					)}
				</TabPanel>
			</PanelBody>

			{mediaID && markers && (
				<>
					<PanelBody
						icon={'flag'}
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

					<PanelBody title={__('Popover settings', 'woo-lookblock')}>

						<UnitRangeControl
							label={__('Padding', 'woo-lookblock')}
							value={popoverStyle.padding}
							onValueChange={handlePopoverPadding}
							onUnitChange={(newUnit) =>
								setAttributes({
									popoverStyle: {
										padding: { value: popoverStyle.padding.value, unit: newUnit }
									}
								})
							}
						/>
						<UnitRangeControl
							label={__('Elements spacing', 'woo-lookblock')}
							value={popoverStyle.innerSpacing}
							onValueChange={handlePopoverInnerSpacing}
							onUnitChange={(newUnit) =>
								setAttributes({
									popoverStyle: {
										innerSpacing: { value: popoverStyle.innerSpacing.value, unit: newUnit }
									}
								})
							}
						/>
					</PanelBody>
				</>
			)}

		</InspectorControls>
	);
};
export default InspectorControlsComponent;
