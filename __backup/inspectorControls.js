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

/**
 * Internal dependency - custom UnitRangeControl, ImageRadioSelectControl.
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
		hotspots,
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

	// IMAGE CONTROLS.
	const onSelectImage = (media) => {
		if (!clearHotspotsOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id });
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

	// MARKER CONTROLS.
	const hotspotToggle = (hotspotIndex) => {
		const updatedHotspots = [...hotspots];
		updatedHotspots[hotspotIndex].active =
			!updatedHotspots[hotspotIndex].active;
		setAttributes({ hotspots: updatedHotspots });
	};
	const hotspotRemove = (hotspotIndex) => {
		const updatedHotspots = [...hotspots];
		updatedHotspots.splice(hotspotIndex, 1);
		setAttributes({ hotspots: updatedHotspots });
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
						label={__('Layout type', 'woohotspots')}
						help={__('Pick a grid type for displaying selected products', 'woohotspots')}
						options={layouts}
						value={productsLayout}
						onChange={productsLayoutChange}
					/>

					<RangeControl
						label={__('Columns', 'woohotspots')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: value })
						}
						min={1}
						max={4}
					/>
					<UnitRangeControl
						label={__('Products gap', 'woohotspots')}
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
						label={__('Elements spacing', 'woohotspots')}
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
						label={__('Product padding', 'woohotspots')}
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
						label={__('Product title size', 'woohotspots')}
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
						label={__('Price size', 'woohotspots')}
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
							label: __('Title Color', 'woohotspots'),
						},
						{
							value: priceColor,
							onChange: (newValue) => setAttributes({ priceColor: newValue }),
							label: __('Price Color', 'woohotspots'),
						}
					]}
				/>

			)
		}
	];

	return (
		<InspectorControls>
			<PanelBody
				title={__('Select products', 'woohotspots')}
				initialOpen={false}
			>

				{getProducts.isResolving ? (
					__('Loading products list', 'woohotspots')
				) : (
					<FormTokenField
						label={__(
							'Start typing product name…',
							'woohotspots'
						)}
						value={displayList}
						suggestions={suggestions}
						onChange={onChangeProductList}

					/>
				)}
			</PanelBody>

			<PanelBody
				title={__('Lookbook image', 'woohotspots')}
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
									: __('Change Image', 'woohotspots')}
							</Button>
						)}
					/>
					{mediaID && (
						<PanelRow>
							<IconButton
								icon="trash"
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
				<PanelRow>
					<SelectControl
						label={__('Image options', 'woohotspots')}
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
				title={__('Lookbook layout', 'woohotspots')}
				initialOpen={false}
			>
				<SelectControl
					//label={__('Layout', 'woohotspots')}
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
					label={__('Vertical align', 'woohotspots')}
					value={valign}
					options={[
						{ label: 'Top', value: 'flex-start' },
						{ label: 'Center', value: 'center' },
						{ label: 'Bottom', value: 'flex-end' },
					]}
					onChange={(value) => setAttributes({ valign: value })}
				/>
				<RangeControl
					label={__('Image width (%)', 'woohotspots')}
					value={imageWidth}
					min={0}
					max={100}
					onChange={(value) =>
						setAttributes({ imageWidth: value })
					}
				/>
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
			</PanelBody>

			<PanelBody
				title={__('Products settings', 'woohotspots')}
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

			{mediaID && hotspots && (
				<PanelBody
					title={__('Product hotspots', 'woohotspots')}
					initialOpen={true}
				>
					{hotspots.map((hotspot, hotspotIndex) => (
						<div
							key={hotspotIndex}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'baseline',
							}}
						>
							<ToggleControl
								label={
									hotspot.productTitle
										? hotspot.productTitle
										: hotspot.name
								}
								checked={hotspot.active}
								onChange={() => hotspotToggle(hotspotIndex)}
							/>
							<IconButton
								icon="trash"
								onClick={() => hotspotRemove(hotspotIndex)}
								label={__('Remove hotspot', 'woohotspots')}
							/>
						</div>
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
			)}

		</InspectorControls>
	);
};
export default InspectorControlsComponent;
