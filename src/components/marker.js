/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from "@wordpress/components";
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import AddMarkerPopover from '../frontend/addMarkerPopover';

const Marker = ({ marker, onDoubleClick, onMouseOver, onMouseOut, clientId, markers, setAttributes, context, unassignProduct, removeMarker, popoverStyle, popoverParent }) => {

	const styles = {
		left: `${marker.x}%`,
		top: `${marker.y}%`,
		visibility: !marker.active ? 'hidden' : 'visible',
	};

	const markerTitleDefault = (context == 'edit') ? marker.name : null;
	const markerTitle = marker.productTitle ? marker.productTitle : markerTitleDefault;

	return (
		<div
			style={styles}
			className="product-marker"
			data-product-title={markerTitle}
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
					<AddMarkerPopover assocProdId={marker.productId} parentElement={popoverParent} popoverStyle={popoverStyle} isEditing />
				)}

			</div>

			<div className='inner' />

			<div className="marker-product-title">
				{markerTitle}
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
