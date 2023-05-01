/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { PanelColorSettings } from '@wordpress/block-editor';
import { TabPanel, CardDivider } from '@wordpress/components';

import UnitRangeControl from './UnitRangeControl';

const PopoverControls = ({ popoverSettings, setAttributes }) => {

	// Popover setting handlers.
	// Padding (custom 'UnitRangeControl' control )
	const handlePopoverPadding = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				padding: { value: newValue, unit: popoverSettings.padding.unit },
			}
		});
	};
	// Spacing for title, price, AddToCart ... (custom 'UnitRangeControl' control )
	const handlePopoverInnerSpacing = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				innerSpacing: { value: newValue, unit: popoverSettings.innerSpacing.unit }
			}
		});
	};
	// Padding for product elements ... (custom 'UnitRangeControl' control )
	const handlePopoverInnerPadding = (newValue) => {
		setAttributes({
			popoverSettings: {
				...popoverSettings,
				innerPadding: { value: newValue, unit: popoverSettings.innerPadding.unit }
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
						value={popoverSettings.padding}
						onValueChange={handlePopoverPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									padding: { value: popoverSettings.padding.value, unit: newUnit }
								}
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements spacing', 'woo-lookblock')}
						value={popoverSettings.innerSpacing}
						onValueChange={handlePopoverInnerSpacing}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									innerSpacing: { value: popoverSettings.innerSpacing.value, unit: newUnit }
								}
							})
						}
					/>
					<UnitRangeControl
						label={__('Product elements padding', 'woo-lookblock')}
						value={popoverSettings.innerPadding}
						onValueChange={handlePopoverInnerPadding}
						onUnitChange={(newUnit) =>
							setAttributes({
								popoverSettings: {
									...popoverSettings,
									innerPadding: { value: popoverSettings.innerPadding.value, unit: newUnit }
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