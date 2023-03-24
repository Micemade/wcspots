/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';

const FeaturedImageEdit = ({ featured_media }) => {

	let media = { isFetching: true };
	try {
		media = useSelect(
			(select) =>
				select('core').getMedia(featured_media) || { isFetching: true },
			[featured_media]
		);
	} catch (error) {
		console.error('Error occurred in useSelect', error);
	}

	return (
		<>
			{media.isFetching && <Spinner />}
			{media.id && (
				<img
					src={media.source_url}
					alt={media.alt_text}
					width="100%"
				/>
			)}
		</>
	);
};

export default FeaturedImageEdit;