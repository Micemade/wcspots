/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
	HeightControl
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TabPanel,
	CardDivider,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button
} from '@wordpress/components';

import { Fragment } from 'react';

/**
 * Internal dependecies.
 */
import UnitRangeControl from './UnitRangeControl';
import ImageRadioSelectControl from './ImageRadioSelectControl';
import metadata from '../block.json';

const PopoverControls = ({ popoverAtts, setAttributes }) => {

	// Desctructure attribute objects for simpler properties access.
	const { elementsToggle, popoverWidth } = popoverAtts;

	// Access default attribute values from block.json for reset.
	const defaultpopoverAtts = metadata.attributes.popoverAtts.default;
	// Resetting the attributes.
	const resetPopoverAtts = (atts) => {
		const newPopoverAtts = { ...popoverAtts };
		atts.forEach((att) => {
			newPopoverAtts[att] = defaultpopoverAtts[att];
		});
		setAttributes({ popoverAtts: newPopoverAtts });
	};

	// Popover settings tabs.
	const popoverAttsTabs = [
		{
			name: 'popoverLayout',
			title: 'Layout',
			content: (
				<div>
					<CardDivider size="xSmall" />

					<ImageRadioSelectControl
						label={__('Popover layout type', 'woo-hotspots')}
						help={__('Pick a layout for popover with product', 'woo-hotspots')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/popoverLayout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/popoverLayout_2.png') },
							{ value: 'layout3', label: 'Layout 3', image: require('./icons/popoverLayout_3.png') },
						]}
						value={popoverAtts.productsLayout}
						onChange={(selectedLayout) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productsLayout: selectedLayout
								}
							});
						}}
						height='38px'
					/>
					<ImageRadioSelectControl
						label={__('Popover align', 'woo-hotspots')}
						help={__('Align product elements in the popover', 'woo-hotspots')}
						options={[
							{ value: 'flex-start', label: 'Flex start', icon: 'align-left' },
							{ value: 'center', label: 'Center', icon: 'align-center' },
							{ value: 'flex-end', label: 'Flex end', icon: 'align-right' },
						]}
						value={popoverAtts.productsAlign}
						onChange={(selectedAlign) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productsAlign: selectedAlign
								}
							});
						}}
					/>

					<CardDivider size="xSmall" />

					<HeightControl
						label={__('Popover width: minimum', 'woo-hotspots')}
						value={popoverWidth.min}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										min: newValue
									}
								}
							});
						}}
					/>
					<HeightControl
						label={__('Popover width: preferred', 'woo-hotspots')}
						value={popoverWidth.val}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										val: newValue
									}
								}
							});
						}}
					/>
					<HeightControl
						label={__('Popover width: maximum', 'woo-hotspots')}
						value={popoverWidth.max}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										max: newValue
									}
								}
							});
						}}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset layout, align, and width', 'woo-hotspots')}
						onClick={() => {
							resetPopoverAtts(['productsLayout', 'productsAlign', 'popoverWidth'])
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
						checked={elementsToggle?.image}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										image: !elementsToggle?.image
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'woo-hotspots')}
						checked={elementsToggle?.title}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										title: !elementsToggle?.title
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show price', 'woo-hotspots')}
						checked={elementsToggle?.price}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										price: !elementsToggle?.price
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show excerpt', 'woo-hotspots')}
						checked={elementsToggle?.excerpt}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										excerpt: !elementsToggle?.excerpt
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show Add to Cart', 'woo-hotspots')}
						checked={elementsToggle?.addToCart}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										addToCart: !elementsToggle?.addToCart
									}
								}
							})
						}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset toggle', 'woo-hotspots')}
						onClick={() => {
							resetPopoverAtts(['elementsToggle'])
						}}
						className='woo-hotspots-reset-attributes'
					/>
				</div>
			)
		}
	];
	// Popover style tabs
	const popoverStyleTabs = [
		{
			name: 'popoverSpacing',
			title: 'Spacing',
			content: (
				<div>
					<CardDivider size="xSmall" />

					<HeightControl
						label={__('Popover padding', 'woo-hotspots')}
						value={popoverAtts.popoverPadding}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverPadding: newValue
								}
							});
						}}
					/>
					<HeightControl
						label={__('Product elements spacing', 'woo-hotspots')}
						value={popoverAtts.productSpacing}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productSpacing: newValue
								}
							});
						}}
					/>
					<HeightControl
						label={__('Product elements padding', 'woo-hotspots')}
						value={popoverAtts.productPadding}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productPadding: newValue
								}
							});
						}}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset spacing', 'woo-hotspots')}
						onClick={() => {
							resetPopoverAtts(['popoverPadding', 'productSpacing', 'productPadding'])
						}}
						className='woo-hotspots-reset-attributes'
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

					<HeightControl
						label={__('Title font size', 'woo-hotspots')}
						value={popoverAtts.titleSize}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									titleSize: newValue
								}
							});
						}}
					/>
					<HeightControl
						label={__('Price font size', 'woo-hotspots')}
						value={popoverAtts.priceSize}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									priceSize: newValue
								}
							});
						}}
					/>
					<HeightControl
						label={__('Short description font size', 'woo-hotspots')}
						value={popoverAtts.excerptSize}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									excerptSize: newValue
								}
							});
						}}
					/>

					<RangeControl
						label={__('Add to Cart size', 'woo-hotspots')}
						value={popoverAtts.addToCartSize}
						onChange={(value) =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									addToCartSize: value
								}
							})
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
							resetPopoverAtts(['titleSize', 'priceSize', 'excerptSize', 'addToCartSize'])
						}}
						className='woo-hotspots-reset-attributes'
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
								value: popoverAtts.productBackColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											productBackColor: newValue
										}
									}),
								label: __('Background Color', 'woo-hotspots'),
							},
							{
								value: popoverAtts.titleColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											titleColor: newValue
										}
									}),
								label: __('Title Color', 'woo-hotspots'),
							},
							{
								value: popoverAtts.priceColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											priceColor: newValue
										}
									}),
								label: __('Price Color', 'woo-hotspots'),
							},
							{
								value: popoverAtts.excerptColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											excerptColor: newValue
										}
									}),
								label: __('Excerpt Color', 'woo-hotspots'),
							},
						]}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset colors', 'woo-hotspots')}
						onClick={() => {
							resetPopoverAtts(['productBackColor', 'titleColor', 'priceColor', 'excerptColor'])
						}}
						className='woo-hotspots-reset-attributes'
					/>
				</div>
			)
		},
	];


	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					title={__('Popover layout', 'woo-hotspots')}
					icon={'images-alt2'}
					initialOpen={false}
				>
					<TabPanel className="popover-layout" tabs={popoverAttsTabs}>
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
					title={__('Popover styles', 'woo-hotspots')}
					icon={'images-alt2'}
					initialOpen={false}
				>

					<TabPanel className="popover-style" tabs={popoverStyleTabs}>
						{(tab) => (
							<div>
								{tab.content}
							</div>
						)}
					</TabPanel>

					<CardDivider size="xSmall" />

					<HeightControl
						label={'Rounded corners'}
						value={popoverAtts.roundCorners}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									roundCorners: newValue
								}
							});
						}}
					/>

					<HeightControl
						label={'Arrow size'}
						value={popoverAtts.arrowSize}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									arrowSize: newValue
								}
							});
						}}
					/>

					<BaseControl help={__('Arrow color is set in "Background Color" ("Colors" tab).', 'woo-hotspots')} />

				</PanelBody>

			</InspectorControls>


		</Fragment>
	);
}

export default PopoverControls;