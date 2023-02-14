/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { useEntityRecords } from '@wordpress/core-data';
import { FormTokenField, Placeholder, PanelBody, Button } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * WooCommerce Blocks dependencies.
 */
// import ProductsControl from '@woocommerce/packages';


// import { useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	// Get data for product post type.
	const streamRequest = useEntityRecords('postType', 'product', { 'per_page': 100 });
	const blockProps = useBlockProps();

	const { productList, mediaID, mediaURL } = attributes;

	// if (streamRequest.isResolving) {
	// 	return <div {...blockProps}> Loading product list...</div>
	// }

	// Display item titles in FormTokenField (value att).
	const displayList = streamRequest?.records
		?.filter((item) => productList?.includes(item.id))
		.map((item) => item.title.rendered);

	// FormTokenField suggestions.
	const suggestions = streamRequest?.records?.map(
		(stream) => {
			return stream.title.rendered
		}
	)
	// Callback when FormTokenField changes.
	const onChangeProductList = (newList) => {
		const newProductList = streamRequest?.records
			?.filter(
				(item) => newList.includes(item.title.rendered)
			)
			.map((item) => item.id)

		setAttributes({ productList: newProductList })
	}
	// Image selection.
	const onSelectImage = (media) => {
		setAttributes({
			mediaURL: media.url,
			mediaID: media.id,
		});

	};

	// WooCommerce-Blocks component.
	// const onChangeProductsControl = (value = []) => {
	// 	console.log(productList);
	// 	const ids = value.map(({ id }) => id);
	// 	setAttributes({ productList: ids });
	// }

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Products', 'woo-lookblock')} initialOpen={true}>
					{/* <ProductsControl
						selected={productList}
						onChange={onChangeProductsControl}
						isCompact={true}
					/> */}
				</PanelBody>

				<PanelBody>
					<FormTokenField
						label={__('Pick products for display', 'woo-lookblock')}
						value={displayList}
						suggestions={suggestions}
						onChange={onChangeProductList}
					/>
				</PanelBody>
				<PanelBody title={__("Lookbook image", 'multi-columns')} initialOpen={true}>
					<MediaUpload
						label={__('Choose image for lookbook item', 'woo-lookblock')}
						onSelect={onSelectImage}
						allowedTypes="image"
						value={mediaID}
						render={({ open }) => (
							<Button
								className={
									mediaID
										? 'image-button'
										: 'button button-large'
								}
								onClick={open}
							>
								{!mediaID ? (
									__('Upload Image', 'woo-lookblock')
								) : (
									<img
										src={mediaURL}
										alt={__(
											'Upload Lookbook image',
											'woo-lookblock'
										)}
									/>
								)}
							</Button>
						)}
					/>
				</PanelBody>

			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="micemade/woo-lookblock"
					attributes={{ productList }}
				// LoadingResponsePlaceholder={ServerSideRenderPlaceholder}
				/>

				{mediaURL ? (
					<img
						className="lookbook-image"
						src={mediaURL}
						alt={__('Lookbook image', 'woo-lookblock')}
					/>
				) : (
					<div>No image</div>
				)}

				{/* 
				{isSelected ? (
					<Placeholder label={__('Products picker', 'woo-lookblock')}>
						<FormTokenField
							label={__('Pick products for display | Click outside to view', 'woo-lookblock')}
							value={displayList}
							suggestions={suggestions}
							onChange={onChangeProductList}
						/>
					</Placeholder>
				) : (
					<ServerSideRender
						block="micemade/woo-lookblock"
						attributes={{ productList }}
						// LoadingResponsePlaceholder={ServerSideRenderPlaceholder}
					/>
				)
				 */}

			</div>
		</>
	);
}
