/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from "@wordpress/components";
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import AddHotspotPopover from '../frontend/addHotspotPopover';

const Hotspot = ({ hotspot, onDoubleClick, onMouseOver, onMouseOut, clientId, hotspots, setAttributes, context, unassignProduct, removeHotspot, popoverSettings, popoverParent }) => {

	const styles = {
		left: `${hotspot.x}%`,
		top: `${hotspot.y}%`,
		visibility: !hotspot.active ? 'hidden' : 'visible',
	};

	const hotspotTitleDefault = (context == 'edit') ? hotspot.name : null;
	const hotspotTitle = hotspot.productTitle ? hotspot.productTitle : hotspotTitleDefault;

	return (
		<div
			style={styles}
			className="product-hotspot"
			data-product-title={hotspotTitle}
			data-product-id={hotspot.productId ? hotspot.productId : ''}
			data-client-id={clientId}
		>
			<div
				className="events-holder"
				onDoubleClick={() => onDoubleClick(hotspot)}
				onMouseOver={() => onMouseOver(event, hotspot, clientId)}
				onMouseOut={() => onMouseOut(event, hotspot, clientId)}
			>
				{(context === 'edit' && hotspot.productId) && (
					<AddHotspotPopover assocProdId={hotspot.productId} parentElement={popoverParent} popoverSettings={popoverSettings} isEditing />
				)}

			</div>

			<div className='inner' />

			<div className="hotspot-product-title">
				{hotspotTitle}
				{(context == 'edit' && hotspot.productId) && (
					<IconButton
						className="unassign"
						icon="remove"
						onClick={() => unassignProduct(hotspots, setAttributes, hotspot.id)}
						label={__('Unassign product', 'woohotspots')}
						isSmall
					/>
				)}
			</div>

			{context == 'edit' && (
				<IconButton
					className="remove-hotspot"
					icon="no"
					onClick={() => removeHotspot(hotspots, setAttributes, hotspot.id)}
					label={__('Remove hotspot', 'woohotspots')}
					isSmall
				/>
			)}

		</div>
	);
};

export default Hotspot;
