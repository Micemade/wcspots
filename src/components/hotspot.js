/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { IconButton, Icon } from "@wordpress/components";

/**
 * Internal dependencies.
 */
import AddHotspotPopover from '../frontend/addHotspotPopover';

/**
 * Hotspot component.
 */
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
		secondaryColor
	} = hotspot;

	const styles = {
		left: `${x}%`,
		top: `${y}%`,
	};
	const titleStyle = {
		color: hotspotSettings.titleColor,
		backgroundColor: hotspotSettings.titleBack,
		fontSize: hotspotSettings.titleSize,
		marginTop: `${hotspotSettings.size - 1}rem`
	};

	let primColor = primaryColor || hotspotSettings.primaryColor;
	let secColor = secondaryColor || hotspotSettings.secondaryColor;

	const outerStyles = {
		...primColor && {
			backgroundColor: primColor,
			outlineColor: primColor
		},
		transform: `scale(${hotspotSettings.size})`
	};
	const innerStyles = {
		...secColor && { backgroundColor: secColor },
		transform: `scale(${hotspotSettings.innerSize})`,
	};

	const hotspotTitle = getHotspotTitle(context, name, productTitle);
	const _iconStyle = iconStyle || hotspotSettings.iconStyle;

	// Drag and drop hotspot.
	let isDragging = false, xPerc = 0, yPerc = 0, container;
	let dragHotspot = document.getElementById(hotspot.id);

	const startDrag = (event) => {
		document.addEventListener('mousemove', dragOnMouseMove);
		document.addEventListener('mouseup', stopDragging);
		container = document.getElementById(`block-${clientId}`)?.getElementsByClassName('image-container')[0];
	}

	const dragOnMouseMove = (event) => {
		isDragging = true;
		if (!hotspot || !dragHotspot || !container) {
			isDragging = false;
			return;
		}
		// Get boundaries of hotspot container (image).
		const rectParent = container.getBoundingClientRect();
		[xPerc, yPerc] = getHotspotPosition(event, rectParent);
		// Update hotspot position.
		dragHotspot.style.left = `${xPerc.toFixed(2)}% `;
		dragHotspot.style.top = `${yPerc.toFixed(2)}%`;
	};

	const stopDragging = (event) => {
		// Update hotspot coordinates in block attributes.
		if (isDragging) {
			setAttributes({ hotspots: updateHotspots(hotspots, hotspot.id, xPerc, yPerc) });
		}
		// Remove listeners.
		document.removeEventListener('mousemove', dragOnMouseMove);
		document.removeEventListener('mouseup', stopDragging);
	};

	return (
		<div
			style={styles}
			id={hotspot.id}
			className={`product-hotspot ${_iconStyle || 'iconstyle-1'}`}
			data-product-title={hotspotTitle}
			data-product-id={productId ? productId : ''}
			data-client-id={clientId}
		>

			<div className='inner' style={innerStyles} />

			<div className='outer' style={outerStyles} />

			<div
				className="events-holder"
				onDoubleClick={() => onDoubleClick(hotspot)}
				onMouseOver={() => onMouseOver(event, hotspot, clientId, primaryColor || hotspotSettings.primaryColor)}
				onMouseOut={() => onMouseOut(event, hotspot, clientId)}
				{...context === 'edit' && ({ onMouseDown: startDrag })}
				title='Press and hold to move the hotspot'
			>
				{(context === 'edit' && productId) && (
					<AddHotspotPopover assocProdId={productId} parentElement={popoverParent} popoverAtts={popoverAtts} isEditing />
				)}

			</div>


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
				<div
					className="remove-hotspot"
					onClick={() => removeHotspot(hotspots, setAttributes, id)}
					title={__('Remove the hotspot', 'wcspots')}
					aria-label={__('Remove the hotspot', 'wcspots')}>
					<Icon icon="no" />
				</div>
			)}

		</div>
	);
};

/**
 * Helper functions.
 */
const getHotspotTitle = (context, name, productTitle) => {
	const hotspotTitleDefault = (context == 'edit') ? name : null;
	return productTitle ? productTitle : hotspotTitleDefault;
};

const getHotspotPosition = (event, rectParent) => {
	let xPerc = ((event.clientX - rectParent.left) / rectParent.width) * 100;
	let yPerc = ((event.clientY - rectParent.top) / rectParent.height) * 100;
	// Simple constrain to image (hotspot container) boundaries.
	xPerc = xPerc >= 100 ? 100 : xPerc;
	xPerc = xPerc <= 0 ? 0 : xPerc;
	yPerc = yPerc >= 100 ? 100 : yPerc;
	yPerc = yPerc <= 0 ? 0 : yPerc;
	return [xPerc, yPerc];
};

const updateHotspots = (hotspots, thisHotspotId, xPerc, yPerc) => hotspots?.map((hotspot) => {
	if (hotspot.id === thisHotspotId) {
		return {
			...hotspot,
			x: xPerc,
			y: yPerc,
		};
	}
	return hotspot;
});

export default Hotspot;

