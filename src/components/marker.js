const Marker = ({ marker, onDoubleClick, onMouseOver, onMouseOut }) => {

	const styles = {
		left: `${marker.x}%`,
		top: `${marker.y}%`,
		visibility: !marker.active ? 'hidden' : 'visible',
	};


	return (
		<div
			style={styles}
			className="product-marker"
			onDoubleClick={() => onDoubleClick(marker)}
			onMouseOver={() => onMouseOver(marker)}
			onMouseOut={() => onMouseOut(marker)}
			data-product-title={marker.productTitle ? marker.productTitle : ''}
			data-product-id={marker.productId ? marker.productId : ''}
		>
			<div className="inner" />
			{marker.productTitle && (
				<div className="screen-reader-text">{marker.productTitle}</div>
			)}
		</div>
	);
};

export default Marker;
