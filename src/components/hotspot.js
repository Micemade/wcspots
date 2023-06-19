/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from "@wordpress/components";

/**
 * Internal dependencies.
 */
import AddHotspotPopover from '../frontend/addHotspotPopover';

const Hotspot = ({ hotspot, hotspotSettings, onDoubleClick, onMouseOver, onMouseOut, clientId, hotspots, setAttributes, context, unassignProduct, removeHotspot, popoverAtts, popoverParent }) => {


	const {
		x,
		y,
		id,
		name,
		productId,
		productTitle,
		assigned,
		iconStyle,
		primaryColor,
		secondaryColor,
		size,
		innerSize
	} = hotspot;

	const styles = {
		left: `${x}%`,
		top: `${y}%`,
		// ...hotspot.primaryColor && { backgroundColor: hotspot.primaryColor, outlineColor: hotspot.primaryColor }
		backgroundColor: primaryColor || hotspotSettings.primaryColor,
		outlineColor: primaryColor || hotspotSettings.primaryColor
	};

	const titleStyle = {
		color: hotspotSettings.titleColor,
		backgroundColor: hotspotSettings.titleBack,
		fontSize: hotspotSettings.titleSize
	}

	const innerStyles = {
		// ...hotspot.secondaryColor && { backgroundColor: hotspot.secondaryColor }
		backgroundColor: secondaryColor || hotspotSettings.secondaryColor
	}

	const hotspotTitleDefault = (context == 'edit') ? name : null;
	const hotspotTitle = productTitle ? productTitle : hotspotTitleDefault;

	const _iconStyle = iconStyle || hotspotSettings.iconStyle;

	return (
		<div
			style={styles}
			className={`product-hotspot ${_iconStyle || 'iconstyle-1'}`}
			data-product-title={hotspotTitle}
			data-product-id={productId ? productId : ''}
			data-client-id={clientId}
		>
			<div
				className="events-holder"
				onDoubleClick={() => onDoubleClick(hotspot)}
				onMouseOver={() => onMouseOver(event, hotspot, clientId)}
				onMouseOut={() => onMouseOut(event, hotspot, clientId)}
			>
				{(context === 'edit' && productId) && (
					<AddHotspotPopover assocProdId={productId} parentElement={popoverParent} popoverAtts={popoverAtts} isEditing />
				)}

			</div>

			<div className='inner' style={innerStyles} />

			{hotspotSettings.showTitle && (
				<div className="hotspot-product-title">

					<span className='title-text' style={titleStyle}>{hotspotTitle}</span>

					{(context == 'edit' && productId) && (
						<IconButton
							className="unassign"
							icon="remove"
							onClick={() => unassignProduct(hotspots, setAttributes, id)}
							label={__('Unassign product', 'wcspots')}
							isSmall
							aria-label={__('Unassign product', 'wcspots')}
						/>
					)}
				</div>
			)}

			{context == 'edit' && (
				<IconButton
					className="remove-hotspot"
					icon="no"
					onClick={() => removeHotspot(hotspots, setAttributes, id)}
					label={__('Remove the hotspot', 'wcspots')}
					isSmall
					aria-label={__('Remove the hotspot', 'wcspots')}
				/>
			)}

		</div>
	);
};

export default Hotspot;
