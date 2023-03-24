const Marker = ({ marker, onClick, onDoubleClick, onMouseOver, onMouseOut, clientId }) => {

	const styles = {
		left: `${marker.x}%`,
		top: `${marker.y}%`,
		visibility: !marker.active ? 'hidden' : 'visible',
	};


	return (
		<div
			style={styles}
			className="product-marker"
			// onClick={() => onClick(marker)}
			onDoubleClick={() => onDoubleClick(marker)}
			onMouseOver={() => onMouseOver(event, marker, clientId)}
			onMouseOut={() => onMouseOut(event, marker, clientId)}
			data-product-title={marker.productTitle ? marker.productTitle : ''}
			data-product-id={marker.productId ? marker.productId : ''}
			data-client-id={clientId}
		>
			<div className="inner" />
			{marker.productTitle && (
				<div className="screen-reader-text">{marker.productTitle}</div>
			)}
		</div>
	);
};

export default Marker;
