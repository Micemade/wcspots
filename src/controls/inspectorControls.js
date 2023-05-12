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

/**
 * React dependencies.
 */
import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { Fragment } from 'react';

/**
 * External dependencies (React components).
 * React select is replacement for FormTokenField Gutenberg component.
 */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

/**
 * Internal dependencies - custom UnitRangeControl, ImageRadioSelectControl components.
 * Built from Gutenberg components.
 */
import ImageRadioSelectControl from './ImageRadioSelectControl';
import PopoverControls from './popoverControls';
import metadata from '../block.json';

/**
 * InspectorControlsComponent function.
 * @param {*} props 
 * @returns 
 */
const InspectorControlsComponent = ({ attributes, setAttributes, clientId }) => {
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
		popoverAtts
	} = attributes;

	// Access default attribute values from block.json for reset.
	const defaultAtts = metadata.attributes;
	// Resetting the attributes.
	const resetAtts = (attsToUpdate) => {
		const savedAtts = { ...attributes };
		attsToUpdate.forEach((att) => {
			savedAtts[att] = defaultAtts[att].default;
		});
		setAttributes(savedAtts);
	};
	/**
	 * Create 'srcset' and 'sizes' img attributes for  image. Discard 'thumbnail' size.
	 */
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

	// IMAGE and HOTSPOT CONTROLS.
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
	 * HOTSPOT CONTROLS.
	 */
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

	/**
	 * FLEX and PRODUCT LAYOUT STYLES.
	 */
	// Flex gap size (custom 'UnitRangeControl' control )
	/* 
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
	*/

	// Product layout tabs.
	const productLayoutTabs = [
		{
			name: 'productsLayout',
			title: 'Layout',
			content: (
				<div>
					<ImageRadioSelectControl
						label={__('Product layout type', 'woo-hotspots')}
						help={__('Pick a grid type for displaying selected products', 'woo-hotspots')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/Layout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/Layout_2.png') },
							{ value: 'layout3', label: 'Layout 3', image: require('./icons/Layout_3.png') },
						]}
						value={productsLayout}
						onChange={(selectedLayout) => {
							setAttributes({ productsLayout: selectedLayout });
						}}
						height='38px'
					/>
					<ImageRadioSelectControl
						label={__('Product align', 'woo-hotspots')}
						help={__('How to align the products', 'woo-hotspots')}
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

					<CardDivider size="xSmall" />

					<RangeControl
						label={__('Columns', 'woo-hotspots')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: value })
						}
						min={1}
						max={4}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset layout, align, and columns', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['productsLayout', 'productsAlign', 'columns'])
						}}
						className='woo-hotspots-reset-attributes'
					/>

				</div>
			),
		},
		{
			name: 'toggleElements',
			title: 'Toggle elements',
			content: (
				<div>
					<CardDivider size="xSmall" />
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show image', 'woo-hotspots')}
						checked={elementsToggle.image}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									image: !elementsToggle.image
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'woo-hotspots')}
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
						label={__('Show price', 'woo-hotspots')}
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
						label={__('Show excerpt', 'woo-hotspots')}
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
						label={__('Show Add to Cart', 'woo-hotspots')}
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

					<Button
						isLink
						isSmall
						text={__('Reset toggles', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['elementsToggle'])
						}}
						className='woo-hotspots-reset-attributes'
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
					<CardDivider size="xSmall" />

					<HeightControl
						label={__('Gap between products', 'woo-hotspots')}
						value={productsGap}
						onChange={(newValue) => {
							setAttributes({ productsGap: newValue });
						}}
					/>
					<HeightControl
						label={__('Product elements spacing', 'woo-hotspots')}
						value={productSpacing}
						onChange={(newValue) => {
							setAttributes({ productSpacing: newValue });
						}}
					/>
					<HeightControl
						label={__('Product elements padding', 'woo-hotspots')}
						value={productPadding}
						onChange={(newValue) => {
							setAttributes({ productPadding: newValue });
						}}
						step={0.5}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset spacing', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['productsGap', 'productSpacing', 'productPadding'])
						}}
						className='woo-hotspots-reset-attributes'
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

					<HeightControl
						label={__('Title font size', 'woo-hotspots')}
						value={titleSize}
						onChange={(newValue) => {
							setAttributes({ titleSize: newValue });
						}}
					/>
					<HeightControl
						label={__('Price font size', 'woo-hotspots')}
						value={priceSize}
						onChange={(newValue) => {
							setAttributes({ priceSize: newValue });
						}}
					/>
					<HeightControl
						label={__('Short description font size', 'woo-hotspots')}
						value={excerptSize}
						onChange={(newValue) => {
							setAttributes({ excerptSize: newValue });
						}}
					/>
					<RangeControl
						label={__('Add to Cart size', 'woo-hotspots')}
						value={addToCartSize}
						onChange={(value) =>
							setAttributes({ addToCartSize: value })
						}
						min={0.5}
						max={2}
						step={0.05}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset sizes', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['titleSize', 'priceSize', 'excerptSize', 'excerptSize', 'addToCartSize'])
						}}
						className='woo-hotspots-reset-attributes'
					/>

				</div>
			),
		},
		{
			name: 'colors',
			title: 'Colors',
			content: (
				<Fragment>
					<PanelColorSettings
						initialOpen={true}
						enableAlpha
						colorSettings={[
							{
								value: productBackColor,
								onChange: (newValue) => setAttributes({ productBackColor: newValue }),
								label: __('Background Color', 'woo-hotspots'),
							},
							{
								value: titleColor,
								onChange: (newValue) => setAttributes({ titleColor: newValue }),
								label: __('Title color', 'woo-hotspots'),
							},
							{
								value: priceColor,
								onChange: (newValue) => setAttributes({ priceColor: newValue }),
								label: __('Price color', 'woo-hotspots'),
							},
							{
								value: excerptColor,
								onChange: (newValue) => setAttributes({ excerptColor: newValue }),
								label: __('Short description color', 'woo-hotspots'),
							}
						]}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset colors', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['productBackColor', 'titleColor', 'priceColor', 'excerptColor'])
						}}
						className='woo-hotspots-reset-attributes'
					/>
				</Fragment>

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
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					icon={'text'}
					title={__('Title and description', 'woo-hotspots')}
					initialOpen={false}
				>

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'woo-hotspots')}
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
						label={__('Show description', 'woo-hotspots')}
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

				{Boolean(window.woohotspotsVars?.wooActive) && (
					<PanelBody
						icon={'store'}
						title={__('WooCommerce products', 'woo-hotspots')}
						initialOpen={true}
					>
						{/* 
					<FormTokenField
						label={__(
							'Start typing product name…',
							'woo-hotspots'
						)}
						value={displayList}
						suggestions={suggestions}
						onChange={onChangeProductList}
					/>
					*/}
						<CardDivider size="xSmall" />

						{getProducts.isResolving ? (
							__('Loading products list', 'woo-hotspots')
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
				)}


				<PanelBody
					icon={'format-image'}
					title={__('Image for Hot Spots', 'woo-hotspots')}
					initialOpen={false}
				>
					<PanelRow>
						<MediaUpload
							label={__(
								'Choose image for Woo HotSpots Block',
								'woo-hotspots'
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
										? __('Add Image', 'woo-hotspots')
										: __('Replace Image', 'woo-hotspots')}
								</Button>
							)}
						/>
						{mediaID && (
							<PanelRow>
								<IconButton
									icon="no-alt"
									onClick={onRemoveImage}
									label={__('Remove image', 'woo-hotspots')}
								/>
							</PanelRow>
						)}
					</PanelRow>
					<PanelRow>
						{mediaID ? (
							<img
								src={mediaURL}
								alt={__(
									'Upload image',
									'woo-hotspots'
								)}
							/>
						) : (
							__('No image selected', 'woo-hotspots')
						)}
					</PanelRow>

					<CardDivider size="xSmall" />

					<SelectControl
						label={__('Background image', 'woo-hotspots')}
						value={backImage}
						options={[
							{ label: 'No background image', value: 'backimage-none' },
							{ label: 'Same image as background', value: 'backimage-same' },
						]}
						onChange={(value) => setAttributes({ backImage: value })}
					/>

					{(backImage !== 'backimage-none') && (
						<RangeControl
							label={__('Background image opacity', 'woo-hotspots')}
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
					title={__('Layout', 'woo-hotspots')}
					initialOpen={false}
				>

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Stack on mobile', 'woo-hotspots')}
						checked={isStackedOnMobile}
						onChange={() =>
							setAttributes({ isStackedOnMobile: !isStackedOnMobile })
						}
					/>

					<SelectControl
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

					{!['image-only', 'column', 'column-reverse'].includes(flexLayout) && (
						<SelectControl
							label={__('Vertical align', 'woo-hotspots')}
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
						label={['image-only', 'column', 'column-reverse'].includes(flexLayout) ?
							(__('Image width (%)', 'woo-hotspots')) :
							(__('Image / products ratio (%)', 'woo-hotspots'))
						}
						value={flexItemsRatio}
						min={0}
						max={100}
						onChange={(value) =>
							setAttributes({ flexItemsRatio: value })
						}
					/>
					{flexLayout !== 'image-only' && (

						<HeightControl
							label={'Image/products gap'}
							value={flexGap}
							onChange={(newValue) => {
								setAttributes({ flexGap: newValue });
							}}
						/>
					)}

					<Button
						isLink
						isSmall
						text={__('Reset layout', 'woo-hotspots')}
						onClick={() => {
							resetAtts(['isStackedOnMobile', 'flexLayout', 'valign', 'flexItemsRatio', 'flexGap'])
						}}
						className='woo-hotspots-reset-attributes'
					/>

				</PanelBody>

				<PanelBody
					icon={'products'}
					title={__('Product layout', 'woo-hotspots')}
					initialOpen={false}
				>
					<TabPanel className="product-settings" tabs={productLayoutTabs}>
						{(tab) => (
							<div>
								{tab.content}
							</div>
						)}
					</TabPanel>

					<BaseControl help={__('Style properties like colors, sizes, and spacing are available in the editor styles tab.', 'woo-hotspots')} />

				</PanelBody>

			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					icon={'store'}
					title={__('Product styles', 'woo-hotspots')}
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

				{mediaID && hotspots && (
					<Fragment>

						<PanelBody
							icon={'marker'}
							title={__('Hotspot styles', 'woo-hotspots')}
							initialOpen={false}
						>
							<CardDivider size="xSmall" />
							{hotspots.map((hotspot, hotspotIndex) => (
								<Fragment key={hotspot.id}>
									<div
										key={hotspotIndex}
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<PanelBody
											title={hotspot.productTitle ? hotspot.productTitle : hotspot.name}
											initialOpen={false}
											className="hotspot-settings"
										>
											<SelectControl
												label={__('Hotspot style', 'woo-hotspots')}
												value={hotspot.iconStyle}
												options={[
													{ label: 'Default style', value: 'default' },
													{ label: 'Style 2', value: 'iconstyle-2' },
													{ label: 'Style 3', value: 'iconstyle-3' },
												]}
												onChange={(value) => {
													setAttributes({
														hotspots: [
															...hotspots.slice(0, hotspotIndex),
															{
																...hotspot,
																iconStyle: value,
															},
															...hotspots.slice(hotspotIndex + 1),
														],
													})
												}}
											/>

											<PanelColorSettings
												initialOpen={true}
												enableAlpha
												colorSettings={[
													{
														value: hotspot.backColor,
														onChange: (newValue) => {
															setAttributes({
																hotspots: [
																	...hotspots.slice(0, hotspotIndex),
																	{
																		...hotspot,
																		backColor: newValue,
																	},
																	...hotspots.slice(hotspotIndex + 1),
																],
															})
														},
														label: __('Back Color', 'woo-hotspots'),
													},
													{
														value: hotspot.innerColor,
														onChange: (newValue) => {
															setAttributes({
																hotspots: [
																	...hotspots.slice(0, hotspotIndex),
																	{
																		...hotspot,
																		innerColor: newValue,
																	},
																	...hotspots.slice(hotspotIndex + 1),
																],
															})
														},
														label: __('Inner Color', 'woo-hotspots'),
													}

												]}
											/>

										</PanelBody>

										<IconButton
											icon="trash"
											onClick={() => hotspotRemove(hotspotIndex)}
											label={__('Remove hotspot', 'woo-hotspots')}
										/>
									</div>
									{/* <CardDivider size="xSmall" /> */}
								</Fragment>

							))}
							{hotspots.length > 0 && (
								<Fragment>
									<CardDivider size="xSmall" />
									<Button
										isSecondary
										isSmall
										onClick={() => setAttributes({ hotspots: [] })}
									>
										{__('Remove All Hotspots', 'woo-hotspots')}
									</Button>
								</Fragment>
							)}
							{hotspots.length == 0 && (<p>{__('Click on image to add hotspots', 'woo-hotspots')}</p>)}
						</PanelBody>

					</Fragment>
				)}
			</InspectorControls>

			{mediaID && hotspots && (
				<PopoverControls
					popoverAtts={popoverAtts}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			)}
		</Fragment>
	);
};
export default InspectorControlsComponent;
