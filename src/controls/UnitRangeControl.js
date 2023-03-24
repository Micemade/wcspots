import { PanelRow, RangeControl, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

function UnitRangeControl({ label, value, onValueChange, onUnitChange, customUnitOptions, ...props }) {

	const defaultUnitOptions = [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'vw', value: 'vw' },
		{ label: 'em', value: 'em' },
		{ label: 'rem', value: 'rem' },
	];
	const unitOptions = customUnitOptions ? customUnitOptions : defaultUnitOptions;

	const [rangeConfig, setRangeConfig] = useState({
		min: 0,
		max: 40,
		step: 1,
	});

	const handleUnitChange = (newUnit) => {
		onUnitChange(newUnit);
		// Update range control config based on selected unit.
		const newRangeConfig = getRangeConfig(newUnit);
		setRangeConfig(newRangeConfig);
	};

	const handleValueChange = (newValue) => {
		onValueChange(newValue);
	};

	const getRangeConfig = (unit) => {
		// Calculate and return range control config based on selected unit.
		let min = 0;
		let max, step;
		switch (unit) {
			case 'px':
				max = 100;
				step = 1;
				break;
			case '%':
				max = 100;
				step = 1;
				break;
			case 'vw':
				max = 10;
				step = 0.1;
				break;
			case 'em':
				max = 10;
				step = 0.1;
				break;
			case 'rem':
				max = 10;
				step = 0.1;
				break;
			default:
				max = 40;
				step = 1;
				break;
		}
		return { min, max, step };
	};

	const rangeConfigForSelectedUnit = getRangeConfig(value.unit);

	return (
		<>
			<PanelRow className='editor-range-unit-combo'>
				<RangeControl
					label={label}
					value={value.value}
					onChange={handleValueChange}
					{...rangeConfigForSelectedUnit}
					{...props}
				/>
				<SelectControl
					label="Unit"
					value={value.unit}
					options={unitOptions}
					onChange={handleUnitChange}
				/>
			</PanelRow>
		</>
	);
}

export default UnitRangeControl;
