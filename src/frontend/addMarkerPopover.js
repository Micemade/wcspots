/**
 * WordPress dependencies.
 */
import { useState } from '@wordpress/element';
/**
 * External dependencies.
 */
import { Popover as MarkerPopover } from 'react-tiny-popover';
/**
 * Internal dependencies
 */
import ProductTitle from '../components/productTitle';
import ProductImage from '../components/productImage';
import ProductPrice from '../components/productPrice';
import ProductAddToCart from '../components/productAddToCart';

const AddMarkerPopover = (props) => {

	const { assocProdId, parentElement } = props;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const togglePopover = () => {
		setIsPopoverOpen((state) => !state);
	};

	const popoverTogglerClass = {
		width: "100%",
		height: "100%",
		backgroundColor: "transparent",
		borderRadius: "50%",
		zIndex: "5"
	}

	return (

		<MarkerPopover
			parentElement={parentElement}
			isOpen={isPopoverOpen}
			onClickOutside={() => setIsPopoverOpen(false)}
			// position={'bottom'} // preferred position
			positions={['bottom', 'top', 'left', 'right']}
			padding={30}
			reposition={true}
			align='center'
			content={(
				<div>
					<ProductImage productId={assocProdId} />
					<ProductTitle productId={assocProdId} />
					<ProductPrice productId={assocProdId} />
					<ProductAddToCart productId={assocProdId} />
				</div>
			)}
			style={{ zIndex: '100' }}
		>
			<div style={popoverTogglerClass} onClick={togglePopover} />
		</MarkerPopover>

	);
}
export default AddMarkerPopover;