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
	TabPanel,
	BaseControl
} from '@wordpress/components';
import { InspectorControls, MediaUpload, PanelColorSettings, HeightControl } from '@wordpress/block-editor';

/////////////////////////////////////
import { useState, useEffect } from 'react';
import { get } from 'lodash';
/////////////////////////////////////


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
import PopoverControls from './popoverControls';
import { Fragment } from 'react';

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
		title,
		settingsTitleDesc,
		productsData,
		media,
		srcSetAtt,
		sizesAtt,
		mediaID,
		mediaURL,
		backImage,
		backimageOpacity,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		flexItemsRatio,
		valign,
		productsLayout,
		productsAlign,
		columns,
		productsGap,
		productPadding,
		productSpacing,
		elementsToggle,
		titleSize,
		priceSize,
		excerptSize,
		addToCartSize,
		productBackColor,
		titleColor,
		priceColor,
		excerptColor,
		hotspots,
		usePopoverCustomSettings,
		popoverSettings
	} = attributes;

	// Create 'srcset' and 'sizes' img attributes for  image. Discard 'thumbnail' size.
	useEffect(() => {
		if (media && media.sizes) {
			const mediaSizes = media.sizes;
			// Filter out the 'thumbnail' media.sizes object property.
			const sizesNoThumb = Object.keys(mediaSizes)
				.filter(key => key !== 'thumbnail')
				.reduce((obj, key) => {
					obj[key] = mediaSizes[key];
					return obj;
				}, {});

			// Create 'srcset' attribute for  image. Usage of 'lodash' method 'get'.
			const createdSrcSet = Object.keys(sizesNoThumb)
				.map(size => `${get(sizesNoThumb, [size, 'url'], '')} ${get(sizesNoThumb, [size, 'width'], '')}w`)
				.join(', ');
			// Create 'sizes' img attribite for  image. Usage of 'lodash' method 'get'.
			const sizes = Object.keys(sizesNoThumb)
				.map(size => `(max-width: ${get(sizesNoThumb, [size, 'width'], '')}px) ${get(sizesNoThumb, [size, 'width'], '')}px`).join(', ')

			setAttributes({ srcSetAtt: createdSrcSet, sizesAtt: sizes })

		}
	}, [media]);


	/**
	 * FormTokenList functions
	// 'productList' must be set in attributes(!).
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
		setAttributes({ productList: newProductIds, products: newProducts});
	};
	*/

	const onChangeProduct = (newList) => {
		hotspotAssignedRemove(newList);
		setAttributes({ productsData: newList })
	}

	// IMAGE CONTROLS.
	const onSelectImage = (media) => {
		if (!clearHotspotsOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id, media: media });
		}
	};
	const onRemoveImage = () => {
		if (!clearHotspotsOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: null, mediaID: null });
		}

	};
	const clearHotspotsOnImageChange = () => {
		if (hotspots.length > 0 && mediaID) {
			if (!confirm("All existing hotspots will be removed - are you sure?")) {
				return false;
			};
		}
		setAttributes({ hotspots: [] });
		return true;
	}

	/**
	 * MARKER CONTROLS.
	 */
	// Activate/deactivate hotspot.
	/* const hotspotToggle = (hotspotIndex) => {
		const updatedHotspots = [...hotspots];
		updatedHotspots[hotspotIndex].active =
			!updatedHotspots[hotspotIndex].active;
		setAttributes({ hotspots: updatedHotspots });
	}; */
	// Delete hotspot.
	const hotspotRemove = (hotspotIndex) => {
		const updatedHotspots = [...hotspots];
		updatedHotspots.splice(hotspotIndex, 1);
		setAttributes({ hotspots: updatedHotspots });
	};
	// Remove hotspot if assigned product is removed.
	const hotspotAssignedRemove = (productDataUpdated) => {
		// .some will keep the items in array matching the criteria (hotspot not assigned  or matching prod id's)
		const filteredHotspots = hotspots.filter((hotspot) =>
			!hotspot.assigned || productDataUpdated.some((productDataItem) => productDataItem.value === hotspot.productId)
		);
		setAttributes({ hotspots: filteredHotspots });
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
	// Product excerpt size (custom 'UnitRangeControl' control )
	const handleExcerptSizeChange = (newValue) => {
		setAttributes({ excerptSize: { value: newValue, unit: excerptSize.unit } });
	};

	// Product layout tabs.
	const productLayoutTabs = [
		{
			name: 'productsLayout',
			title: 'Layout',
			content: (
				<div>
					<ImageRadioSelectControl
						label={__('Product layout type', 'woohotspots')}
						help={__('Pick a grid type for displaying selected products', 'woohotspots')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/Layout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/Layout_2.png') },
							{ value: 'layout3', label: 'Layout 3', image: require('./icons/Layout_3.png') },
						]}
						value={productsLayout}
						onChange={(selectedLayout) => {
							setAttributes({ productsLayout: selectedLayout });
						}}
						height='28px'
					/>
					<ImageRadioSelectControl
						label={__('Product align', 'woohotspots')}
						help={__('How to align the products', 'woohotspots')}
						options={[
							{ value: 'flex-start', label: 'Flex start', icon: 'align-left' },
							{ value: 'center', label: 'Center', icon: 'align-center' },
							{ value: 'flex-end', label: 'Flex end', icon: 'align-right' },
						]}
						value={productsAlign}
						onChange={(selectedAlign) => {
							setAttributes({ productsAlign: selectedAlign });
						}}
						height='28px'
					/>

					<CardDivider />

					<RangeControl
						label={__('Columns', 'woohotspots')}
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
			name: 'toggleElements',
			title: 'Toggle elements',
			content: (
				<div>
					<CardDivider />
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'woohotspots')}
						checked={elementsToggle.title}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									title: !elementsToggle.title
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show price', 'woohotspots')}
						checked={elementsToggle.price}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									price: !elementsToggle.price
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show excerpt', 'woohotspots')}
						checked={elementsToggle.excerpt}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									excerpt: !elementsToggle.excerpt
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show Add to Cart', 'woohotspots')}
						checked={elementsToggle.addToCart}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									addToCart: !elementsToggle.addToCart
								}
							})
						}
					/>
				</div>
			)
		}
	];

	// Tabs for Product style section.
	const productStyleTabs = [
		{
			name: 'productsSpacing',
			title: 'Spacing',
			content: (
				<div>
					<CardDivider />
					<UnitRangeControl
						label={__('Products gap', 'woohotspots')}
						value={productsGap}
						onValueChange={handleProductsGap}
						onUnitChange={(newUnit) =>
							setAttributes({
								productsGap: { value: productsGap.value, unit: newUnit },
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements spacing', 'woohotspots')}
						value={productSpacing}
						onValueChange={handleproductSpacing}
						onUnitChange={(newUnit) =>
							setAttributes({
								productSpacing: { value: productSpacing.value, unit: newUnit },
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements padding', 'woohotspots')}
						value={productPadding}
						onValueChange={handleproductPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								productPadding: { value: productPadding.value, unit: newUnit },
							})
						}
					/>
				</div>
			)
		},
		{
			name: 'productSizes',
			title: 'Sizes',
			content: (
				<div>
					<CardDivider size="xSmall" />
					<UnitRangeControl
						label={__('Title font size', 'woohotspots')}
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
						label={__('Price font size', 'woohotspots')}
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
					<UnitRangeControl
						label={__('Short description font size', 'woohotspots')}
						value={excerptSize}
						onValueChange={handleExcerptSizeChange}
						onUnitChange={(newUnit) =>
							setAttributes({
								excerptSize: { value: excerptSize.value, unit: newUnit },
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
						label={__('Add to Cart size', 'woohotspots')}
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
					initialOpen={true}
					enableAlpha
					colorSettings={[
						{
							value: productBackColor,
							onChange: (newValue) => setAttributes({ productBackColor: newValue }),
							label: __('Background Color', 'woohotspots'),
						},
						{
							value: titleColor,
							onChange: (newValue) => setAttributes({ titleColor: newValue }),
							label: __('Title color', 'woohotspots'),
						},
						{
							value: priceColor,
							onChange: (newValue) => setAttributes({ priceColor: newValue }),
							label: __('Price color', 'woohotspots'),
						},
						{
							value: excerptColor,
							onChange: (newValue) => setAttributes({ excerptColor: newValue }),
							label: __('Short description color', 'woohotspots'),
						}
					]}
				/>

			)
		},
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


	// Return Inspector controls.
	return (
		<InspectorControls>
			<PanelBody
				icon={'text'}
				title={__('Title and description', 'woohotspots')}
				initialOpen={false}
			>

				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Show title', 'woohotspots')}
					checked={settingsTitleDesc.activeTitle}
					onChange={() =>
						setAttributes({
							settingsTitleDesc: {
								...settingsTitleDesc,
								activeTitle: !settingsTitleDesc.activeTitle
							}
						})
					}
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Show description', 'woohotspots')}
					checked={settingsTitleDesc.activeDesc}
					onChange={() =>
						setAttributes({
							settingsTitleDesc: {
								...settingsTitleDesc,
								activeDesc: !settingsTitleDesc.activeDesc
							}
						})
					}
				/>

				<HeightControl
					label={'Title spacing'}
					value={settingsTitleDesc.spacingTitle}
					onChange={(newSpacing) => {
						setAttributes({
							settingsTitleDesc: {
								...settingsTitleDesc,
								spacingTitle: newSpacing
							}
						});
					}}
				/>

				<HeightControl
					label={'Decription spacing'}
					value={settingsTitleDesc.spacingDesc}
					onChange={(newSpacing) => {
						setAttributes({
							settingsTitleDesc: {
								...settingsTitleDesc,
								spacingDesc: newSpacing
							}
						});
					}}
				/>

			</PanelBody>

			<PanelBody
				icon={'store'}
				title={__('WooCommerce products', 'woohotspots')}
				initialOpen={true}
			>
				{/* 
				<FormTokenField
					label={__(
						'Start typing product name…',
						'woohotspots'
					)}
					value={displayList}
					suggestions={suggestions}
					onChange={onChangeProductList}
				/>
				*/}
				<CardDivider />

				{getProducts.isResolving ? (
					__('Loading products list', 'woohotspots')
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
				title={__('Lookblock image', 'woohotspots')}
				initialOpen={false}
			>
				<PanelRow>
					<MediaUpload
						label={__(
							'Choose image for Woo HotSpots Block',
							'woohotspots'
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
									? __('Add Image', 'woohotspots')
									: __('Replace Image', 'woohotspots')}
							</Button>
						)}
					/>
					{mediaID && (
						<PanelRow>
							<IconButton
								icon="no-alt"
								onClick={onRemoveImage}
								label={__('Remove image', 'woohotspots')}
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
								'woohotspots'
							)}
						/>
					) : (
						__('No LookBook image selected', 'woohotspots')
					)}
				</PanelRow>

				<CardDivider />

				<SelectControl
					label={__('Background image', 'woohotspots')}
					value={backImage}
					options={[
						{ label: 'No background image', value: 'backimage-none' },
						{ label: 'Lookblock image as background', value: 'backimage-same' },
					]}
					onChange={(value) => setAttributes({ backImage: value })}
				/>

				{(backImage !== 'backimage-none') && (
					<RangeControl
						label={__('Background image opacity', 'woohotspots')}
						value={backimageOpacity}
						onChange={(value) =>
							setAttributes({ backimageOpacity: value })
						}
						min={0}
						max={1}
						step={0.05}
					/>
				)}

			</PanelBody>

			<PanelBody
				icon={'layout'}
				title={__('Lookbook layout', 'woohotspots')}
				initialOpen={false}
			>

				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Stack on mobile', 'woohotspots')}
					checked={isStackedOnMobile}
					onChange={() =>
						setAttributes({ isStackedOnMobile: !isStackedOnMobile })
					}
				/>

				<SelectControl
					//label={__('Layout', 'woohotspots')}
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

				{flexLayout !== 'image-only' && (
					<SelectControl
						label={__('Vertical align', 'woohotspots')}
						value={valign}
						options={[
							{ label: 'Top', value: 'flex-start' },
							{ label: 'Center', value: 'center' },
							{ label: 'Bottom', value: 'flex-end' },
							{ label: 'Stretch', value: 'stretch' },
						]}
						onChange={(value) => setAttributes({ valign: value })}
					/>
				)}

				<RangeControl
					label={__('Image / products ratio (%)', 'woohotspots')}
					value={flexItemsRatio}
					min={0}
					max={100}
					onChange={(value) =>
						setAttributes({ flexItemsRatio: value })
					}
				/>
				{flexLayout !== 'image-only' && (
					<UnitRangeControl
						label={__('Image/Products Gap', 'woohotspots')}
						value={flexGap}
						onValueChange={handleFlexGapChange}
						onUnitChange={(newUnit) =>
							setAttributes({
								flexGap: { value: flexGap.value, unit: newUnit },
							})
						}
						customUnitOptions={null}
					/>
				)}

			</PanelBody>

			<PanelBody
				icon={'products'}
				title={__('Product layout', 'woohotspots')}
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
				title={__('Product styles', 'woohotspots')}
				initialOpen={false}
			>
				<BaseControl help={__('Product styles are also used for Popover. To override, switch the "Use custom Popover styles" in the "Popover styles" section', 'woohotspots')} />

				<TabPanel className="product-settings" tabs={productStyleTabs}>
					{(tab) => (
						<div>
							{tab.content}
						</div>
					)}
				</TabPanel>
			</PanelBody>

			{mediaID && hotspots && (
				<>
					<PanelBody
						icon={'hotspot'}
						title={__('Product hotspots', 'woohotspots')}
						initialOpen={false}
					>

						{hotspots.map((hotspot, hotspotIndex) => (
							<Fragment>
								<div
									key={hotspotIndex}
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'baseline',
									}}
								>
									{/* 
									<ToggleControl
										label={hotspot.productTitle ? hotspot.productTitle : hotspot.name}
										checked={hotspot.active}
										onChange={() => hotspotToggle(hotspotIndex)}
									/>
									*/}
									<p>{hotspot.productTitle ? hotspot.productTitle : hotspot.name}</p>
									<IconButton
										icon="trash"
										onClick={() => hotspotRemove(hotspotIndex)}
										label={__('Remove hotspot', 'woohotspots')}
									/>
								</div>
								<PanelBody title='Hotspot settings' initialOpen={false}>

								</PanelBody>
								<CardDivider />
							</Fragment>

						))}
						{hotspots.length > 0 && (
							<Button
								isSecondary
								isSmall
								onClick={() => setAttributes({ hotspots: [] })}
							>
								{__('Remove All Hotspots', 'woohotspots')}
							</Button>
						)}
						{hotspots.length == 0 && (<p>{__('Click on image to add hotspots', 'woohotspots')}</p>)}
					</PanelBody>

					<PanelBody title={__('Popover styles', 'woohotspots')} icon={''}>

						<ToggleControl
							__nextHasNoMarginBottom
							label={__('Use custom Popover styles', 'woohotspots')}
							checked={usePopoverCustomSettings}
							onChange={() =>
								setAttributes({ usePopoverCustomSettings: !usePopoverCustomSettings })
							}
							help={__('Popover shares styles with lookblock products. Switch this on to use custom styles for Popover', 'woohotspots')}
						/>
						{usePopoverCustomSettings && (
							<PopoverControls
								popoverSettings={popoverSettings}
								setAttributes={setAttributes}
							/>
						)}

					</PanelBody>
				</>
			)}

		</InspectorControls>
	);
};
export default InspectorControlsComponent;
