/**
 * ImageRadioSelectControl Component
 *
 * A custom WordPress block editor control that allows users to select from a set of options
 * represented by either SVG icons, Dashicons, or images. The component renders as a button group
 * where each option is displayed as a button with its corresponding icon/image.
 *
 * Features:
 * - Supports three types of visual representations: SVG icons, Dashicons, and images
 * - Maintains type safety through TypeScript interfaces
 * - Responsive button group layout
 * - Customizable icon/image size
 * - Help text support
 *
 * @example
 * ```tsx
 * <ImageRadioSelectControl
 *   label="Select Layout"
 *   value={selectedLayout}
 *   options={[
 *     { value: 'grid', label: 'Grid', type: 'svg', icon: gridIcon },
 *     { value: 'list', label: 'List', type: 'dash', icon:'list-view' },
 *     { value: 'custom', label: 'Custom', type: 'image', icon:'/path/to/image.png' }
 *   ]}
 *   onChange={(value) => setSelectedLayout(value)}
 * />
 * ```
 */

import React from 'react';
import { Button, ButtonGroup, BaseControl, Icon, Dashicon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

type IconType = React.ComponentType<{ size?: number }>;

interface ImageRadioOption {
	value: string;
	label: string;
	type: 'svg' | 'dash' | 'image';
	icon: IconType | string;  // IconType for SVG, string for dash/image
}

// Define the main props interface
interface ImageRadioSelectControlProps {
	value: string;
	options: ImageRadioOption[];
	onChange: (value: string) => void;
	label: string;
	size?: number;
	help?: string;
}

/**
 * A custom control component that renders a group of buttons with icons/images for selection.
 *
 * @param {ImageRadioSelectControlProps} props - The component props
 * @param {string} props.value - The currently selected option value
 * @param {ImageRadioOption[]} props.options - Array of options to display
 * @param {(value: string) => void} props.onChange - Callback function when selection changes
 * @param {string} props.label - Label text for the control
 * @param {number} [props.size=24] - Size of the icons/images in pixels
 * @param {string} [props.help] - Optional help text to display below the control
 * @returns {JSX.Element} A button group control with icon/image options
 */
const ImageRadioSelectControl: React.FC<ImageRadioSelectControlProps> = ({
	value,
	options,
	onChange,
	label,
	size = 24, // default value
	help
}) => {
	const [activeOption, setActiveOption] = useState<string>(value);

	const handleClick = (optionValue: string): void => {
		setActiveOption(optionValue);
		onChange(optionValue);
	};

	useEffect(() => {
		setActiveOption(value);
	}, [value]);

	/**
	 * Renders the appropriate icon or image based on the option type.
	 *
	 * @param {ImageRadioOption} option - The option containing icon/image information
	 * @returns {React.ReactNode} The rendered icon component or null if no valid icon type is found
	 *
	 * @example
	 * // Returns an SVG icon component
	 * renderIcon({ type: 'svg', icon: gridIcon, value: 'grid', label: 'Grid' })
	 *
	 * // Returns a Dashicon component
	 * renderIcon({ type: 'dash', icon: 'list-view', value: 'list', label: 'List' })
	 *
	 * // Returns an image element
	 * renderIcon({ type: 'image', icon: '/path/to/image.png', value: 'custom', label: 'Custom' })
	 */
	const renderIcon = (option: ImageRadioOption): React.ReactNode => {
		switch (option.type) {
			case 'svg':
				return <Icon icon={option.icon as IconType} size={size} />;
			case 'dash':
				return <Dashicon icon={option.icon as any} size={size} />;
			case 'image':
				return <img src={option.icon as string} alt={option.label} style={{ height: `${size}px` }} />;
			default:
				return null;
		}
	};

	return (
		<BaseControl label={label} help={help} className='image-radio-select-control-label wcspots-label'>
			<ButtonGroup>
				{options.map((option: ImageRadioOption) => (
					<Button
						key={option.value}
						variant={activeOption === option.value ? 'primary' : undefined}
						onClick={() => handleClick(option.value)}
						className='wcspots-image-button'
					>
						{renderIcon(option)}
					</Button>
				))}
			</ButtonGroup>
		</BaseControl>
	);
};

export default ImageRadioSelectControl;
