import { Button, ButtonGroup, BaseControl, Dashicon } from '@wordpress/components';
import { useState } from '@wordpress/element';

function ImageRadioSelectControl({ value, options, onChange, label, height, help }) {
	const [activeOption, setActiveOption] = useState(value);

	const handleClick = (option) => {
		setActiveOption(option);
		onChange(option);
	};

	return (
		<>
			<BaseControl label={label} help="" className='image-radio-select-control-label woohotspots-label' />

			<ButtonGroup>
				{options.map((option) => (
					<Button
						key={option.value}
						isPrimary={activeOption === option.value}
						onClick={() => handleClick(option.value)}
						style={{ padding: "4px", boxShadow: "none", border: "none" }}
						className='woohotspots-products-layout'
					>
						{option.icon ? (
							<Dashicon icon={option.icon} />
						) : (
							<img src={option.image} alt={option.label} style={{ height: height }} />
						)}

					</Button>
				))}
			</ButtonGroup>
		</>
	);
}

export default ImageRadioSelectControl;
