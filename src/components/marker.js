/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from "@wordpress/components";

import AddMarkerPopover from '../frontend/addMarkerPopover';

const Marker = ({ marker, onDoubleClick, onMouseOver, onMouseOut, clientId, markers, setAttributes, context, unassignProduct, removeMarker }) => {

	const styles = {
		left: `${marker.x}%`,
		top: `${marker.y}%`,
		visibility: !marker.active ? 'hidden' : 'visible',
	};

	const markerLabelDefault = (context == 'edit') ? marker.name : null;
	const markerLabel = marker.productTitle ? marker.productTitle : markerLabelDefault;

	const popoverParent = document.getElementsByClassName('editor-styles-wrapper')[0];

	return (
		<div
			style={styles}
			className="product-marker"
			data-product-title={markerLabel}
			data-product-id={marker.productId ? marker.productId : ''}
			data-client-id={clientId}
		>
			<div
				className="events-holder"
				onDoubleClick={() => onDoubleClick(marker)}
				onMouseOver={() => onMouseOver(event, marker, clientId)}
				onMouseOut={() => onMouseOut(event, marker, clientId)}
			>
				{(context === 'edit' && marker.productId) && (
					<AddMarkerPopover assocProdId={marker.productId} parentElement={popoverParent} />
				)}

			</div>

			<div className='inner' />

			<div className="marker-product-title">
				{markerLabel}
				{(context == 'edit' && marker.productId) && (
					<IconButton
						className="unassign"
						icon="remove"
						onClick={() => unassignProduct(markers, setAttributes, marker.id)}
						label={__('Unassign product', 'woo-lookblock')}
						isSmall
					/>
				)}
			</div>

			{context == 'edit' && (
				<IconButton
					className="remove-marker"
					icon="no"
					onClick={() => removeMarker(markers, setAttributes, marker.id)}
					label={__('Remove marker', 'woo-lookblock')}
					isSmall
				/>
			)}

		</div>
	);
};

export default Marker;
