import { Button, ButtonGroup, BaseControl, CardDivider } from '@wordpress/components';
import { useState } from '@wordpress/element';

function ImageRadioSelectControl({ value, options, onChange, label, help }) {
	const [activeOption, setActiveOption] = useState(value);

	const handleClick = (option) => {
		setActiveOption(option);
		onChange(option);
	};

	return (
		<>
			<BaseControl __nextHasNoMarginBottom={true} label={label} help="" />

			<ButtonGroup>
				{options.map((option) => (
					<Button
						key={option.value}
						isPrimary={activeOption === option.value}
						onClick={() => handleClick(option.value)}
						style={{ padding: "4px", boxShadow: "none", border: "none" }}
						className='woo-lookblock-products-layout'
					>
						<img src={option.image} alt={option.label} style={{ height: '42px' }} />
					</Button>
				))}
			</ButtonGroup>
			<CardDivider />
		</>
	);
}

export default ImageRadioSelectControl;
