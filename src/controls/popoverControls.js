/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import { TabPanel, CardDivider, RangeControl } from '@wordpress/components';

import UnitRangeControl from './UnitRangeControl';

const PopoverControls = ({ popoverSettings, setAttributes }) => {

	// Popover setting handlers.
	// Padding (custom 'UnitRangeControl' control ) - uses 'productsGap' property (sharing).
	const handlePopoverPadding = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				productsGap: { value: newValue, unit: popoverSettings.productsGap.unit }
			}
		});
	};
	// Spacing for title, price, AddToCart ... (custom 'UnitRangeControl' control )
	const handlePopoverProductSpacing = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				productSpacing: { value: newValue, unit: popoverSettings.productSpacing.unit }
			}
		});
	};
	// Padding for product elements ... (custom 'UnitRangeControl' control )
	const handlePopoverInnerPadding = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				productPadding: { value: newValue, unit: popoverSettings.productPadding.unit }
			}
		});
	};

	const popoverTabs = [
		{
			name: 'popoverSpacing',
			title: 'Spacing',
			content: (
				<div>
					<CardDivider />

					<UnitRangeControl
						label={__('Popover padding', 'woo-lookblock')}
						value={popoverSettings.productsGap}
						onValueChange={handlePopoverPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									productsGap: { value: popoverSettings.productsGap.value, unit: newUnit }
								}
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements spacing', 'woo-lookblock')}
						value={popoverSettings.productSpacing}
						onValueChange={handlePopoverProductSpacing}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									productSpacing: { value: popoverSettings.productSpacing.value, unit: newUnit }
								}
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements padding', 'woo-lookblock')}
						value={popoverSettings.productPadding}
						onValueChange={handlePopoverInnerPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									productPadding: { value: popoverSettings.productPadding.value, unit: newUnit }
								}
							})
						}
					/>
				</div>
			)
		},
		{
			name: 'popoverSizes',
			title: 'Sizes',
			content: (
				<div>
					<CardDivider size="xSmall" />
					<UnitRangeControl
						label={__('Title font size', 'woo-lookblock')}
						value={popoverSettings.titleSize}
						onValueChange={(newValue) => {
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									titleSize: { value: newValue, unit: popoverSettings.titleSize.unit }
								}
							})
						}}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									titleSize: { value: popoverSettings.titleSize.value, unit: newUnit }
								}
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
						label={__('Price font size', 'woo-lookblock')}
						value={popoverSettings.priceSize}
						onValueChange={(newValue) => {
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									priceSize: { value: newValue, unit: popoverSettings.priceSize.unit }
								}
							})
						}}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									priceSize: { value: popoverSettings.priceSize.value, unit: newUnit }
								}
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
						label={__('Short description font size', 'woo-lookblock')}
						value={popoverSettings.excerptSize}
						onValueChange={(newValue) => {
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									excerptSize: { value: newValue, unit: popoverSettings.excerptSize.unit }
								}
							})
						}}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									excerptSize: { value: popoverSettings.excerptSize.value, unit: newUnit }
								}
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
						value={popoverSettings.addToCartSize}
						onChange={(value) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									addToCartSize: value
								}
							})
						}
						min={0.5}
						max={2}
						step={0.05}
					/>
				</div>
			)
		},
		{
			name: 'popoverColors',
			title: 'Colors',
			content: (
				<div>
					<PanelColorSettings
						initialOpen={false}
						enableAlpha
						colorSettings={[
							{
								value: popoverSettings.productBackColor,
								onChange: (newValue) =>
									setAttributes({
										popoverSettings: {
											...popoverSettings,
											productBackColor: newValue
										}
									}),
								label: __('Background Color', 'woo-lookblock'),
							},
							{
								value: popoverSettings.titleColor,
								onChange: (newValue) =>
									setAttributes({
										popoverSettings: {
											...popoverSettings,
											titleColor: newValue
										}
									}),
								label: __('Title Color', 'woo-lookblock'),
							},
							{
								value: popoverSettings.priceColor,
								onChange: (newValue) =>
									setAttributes({
										popoverSettings: {
											...popoverSettings,
											priceColor: newValue
										}
									}),
								label: __('Price Color', 'woo-lookblock'),
							},
							{
								value: popoverSettings.excerptColor,
								onChange: (newValue) =>
									setAttributes({
										popoverSettings: {
											...popoverSettings,
											excerptColor: newValue
										}
									}),
								label: __('Excerpt Color', 'woo-lookblock'),
							},
						]}
					/>
				</div>
			)
		},
	];

	return (
		<TabPanel className="popover-settings" tabs={popoverTabs}>
			{(tab) => (
				<div>
					{tab.content}
				</div>
			)}
		</TabPanel>
	);
}

export default PopoverControls;