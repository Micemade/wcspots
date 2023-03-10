/******/ (function () { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/marker.js":
/*!**********************************!*\
  !*** ./src/components/marker.js ***!
  \**********************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

        const Marker = _ref => {
          let {
            marker,
            onDoubleClick,
            onMouseOver,
            onMouseOut
          } = _ref;
          const styles = {
            left: `${marker.x}%`,
            top: `${marker.y}%`,
            visibility: !marker.active ? 'hidden' : 'visible'
          };
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            style: styles,
            className: "product-marker",
            onDoubleClick: () => onDoubleClick(marker),
            onMouseOver: () => onMouseOver(marker),
            onMouseOut: () => onMouseOut(marker),
            "data-product-title": marker.productTitle ? marker.productTitle : '',
            "data-product-id": marker.productId ? marker.productId : ''
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "inner"
          }), marker.productTitle && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "screen-reader-text"
          }, marker.productTitle));
        };
/* harmony default export */ __webpack_exports__["default"] = (Marker);

        /***/
}),

/***/ "./src/components/productExcerpt.js":
/*!******************************************!*\
  !*** ./src/components/productExcerpt.js ***!
  \******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useProduct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useProduct */ "./src/components/useProduct.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_3__);




        const ProductExcerpt = _ref => {
          let {
            productId
          } = _ref;
          const {
            product,
            loading
          } = (0, _useProduct__WEBPACK_IMPORTED_MODULE_2__["default"])(productId);
          const sanitizer = (dompurify__WEBPACK_IMPORTED_MODULE_3___default().sanitize);
          if (loading) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading short description...', 'woo-lookblock'));
          }
          if (!product) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product not found', 'woo-lookblock'));
          }

          // Product price HTML sanitized.
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            dangerouslySetInnerHTML: {
              __html: sanitizer(product.short_description)
            }
          });
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductExcerpt);

        /***/
}),

/***/ "./src/components/productGrid.js":
/*!***************************************!*\
  !*** ./src/components/productGrid.js ***!
  \***************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _productItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productItem */ "./src/components/productItem.js");

        /**
         * Internal dependencies.
         */

        const ProductGrid = _ref => {
          let {
            productList,
            columns,
            gap,
            context
          } = _ref;
          const gridStyle = {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`
          };
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            style: gridStyle,
            className: "product-grid"
          }, productList.map(productId => (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_productItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
            key: `product-${context}-${productId}`,
            productId: productId,
            context: context
          })));
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductGrid);

        /***/
}),

/***/ "./src/components/productImage.js":
/*!****************************************!*\
  !*** ./src/components/productImage.js ***!
  \****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useProduct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useProduct */ "./src/components/useProduct.js");




        const ProductImage = _ref => {
          let {
            productId
          } = _ref;
          const {
            product,
            loading
          } = (0, _useProduct__WEBPACK_IMPORTED_MODULE_3__["default"])(productId);
          if (loading) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null);
          }
          if (!product) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Product not found', 'woo-lookblock'));
          }
          const imgSrcSet = product.images && product.images.length > 0 ? product.images[0].src : null;
          const imageFallback = typeof wc == 'object' ? (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            src: wc?.wcSettings?.PLACEHOLDER_IMG_SRC,
            alt: product.name
          }) : (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Product has no featured image', 'woo-lookblock');
          return imgSrcSet ? (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            srcSet: imgSrcSet,
            alt: product.name
          }) : (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, imageFallback);
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductImage);

        /***/
}),

/***/ "./src/components/productItem.js":
/*!***************************************!*\
  !*** ./src/components/productItem.js ***!
  \***************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _productImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productImage */ "./src/components/productImage.js");
/* harmony import */ var _productTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productTitle */ "./src/components/productTitle.js");
/* harmony import */ var _productPrice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./productPrice */ "./src/components/productPrice.js");
/* harmony import */ var _productExcerpt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./productExcerpt */ "./src/components/productExcerpt.js");





        const ProductItem = _ref => {
          let {
            productId,
            context
          } = _ref;
          const isEdit = productId !== 0 && context == 'edit';
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "woo-lookblock-product",
            "data-product-id": productId
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "product-featured-image",
            id: `product-image-${productId}`
          }, isEdit && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_productImage__WEBPACK_IMPORTED_MODULE_1__["default"], {
            productId: productId
          })), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
            className: "product-title",
            id: `product-title-${productId}`
          }, isEdit && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_productTitle__WEBPACK_IMPORTED_MODULE_2__["default"], {
            productId: productId
          })), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "product-price",
            id: `product-price-${productId}`
          }, isEdit && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_productPrice__WEBPACK_IMPORTED_MODULE_3__["default"], {
            productId: productId
          })), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "product-excerpt",
            id: `product-excerpt-${productId}`
          }, isEdit && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_productExcerpt__WEBPACK_IMPORTED_MODULE_4__["default"], {
            productId: productId
          })));
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductItem);

        /***/
}),

/***/ "./src/components/productPrice.js":
/*!****************************************!*\
  !*** ./src/components/productPrice.js ***!
  \****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useProduct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useProduct */ "./src/components/useProduct.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_3__);




        const ProductPrice = _ref => {
          let {
            productId
          } = _ref;
          const {
            product,
            loading
          } = (0, _useProduct__WEBPACK_IMPORTED_MODULE_2__["default"])(productId);
          const sanitizer = (dompurify__WEBPACK_IMPORTED_MODULE_3___default().sanitize);
          if (loading) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading product price...', 'woo-lookblock'));
          }
          if (!product) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product not found', 'woo-lookblock'));
          }

          // Product price HTML sanitized.
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            dangerouslySetInnerHTML: {
              __html: sanitizer(product.price_html)
            }
          });
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductPrice);

        /***/
}),

/***/ "./src/components/productTitle.js":
/*!****************************************!*\
  !*** ./src/components/productTitle.js ***!
  \****************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useProduct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useProduct */ "./src/components/useProduct.js");



        const ProductTitle = _ref => {
          let {
            productId
          } = _ref;
          const {
            product,
            loading
          } = (0, _useProduct__WEBPACK_IMPORTED_MODULE_2__["default"])(productId);
          if (loading) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading product title...', 'woo-lookblock'));
          }
          if (!product) {
            return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product not found', 'woo-lookblock'));
          }
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
            href: product.permalink
          }, product.name);
        };
/* harmony default export */ __webpack_exports__["default"] = (ProductTitle);

        /***/
}),

/***/ "./src/components/useProduct.js":
/*!**************************************!*\
  !*** ./src/components/useProduct.js ***!
  \**************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
        /**
         * WordPress Dependencies.
         */
        // import { useState, useEffect } from '@wordpress/element';


        const useProduct = productId => {
          const [product, setProduct] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
          const [loading, setLoading] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
            async function fetchProduct() {
              try {
                const product = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
                  path: `/wc/store/v1/products/${productId}?_fields=id,name,short_description,price_html,images, permalink`
                });
                setProduct(product);
                setLoading(false);
              } catch (error) {
                console.error(error);
              }
            }
            fetchProduct();
          }, [productId]);
          return {
            product,
            loading
          };
        };
/* harmony default export */ __webpack_exports__["default"] = (useProduct);

        /***/
}),

/***/ "./src/controls/inspectorControls.js":
/*!*******************************************!*\
  !*** ./src/controls/inspectorControls.js ***!
  \*******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);

        /**
         * WordPress dependenices.
         */




        const InspectorControlsComponent = _ref => {
          let {
            attributes,
            setAttributes
          } = _ref;
          // Get data for product post type.
          const getProducts = (0, _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.useEntityRecords)('postType', 'product', {
            per_page: -1
          });
          const {
            productList,
            mediaID,
            mediaURL,
            columns,
            gap,
            valign,
            productsWidth,
            direction,
            flexgap,
            markers,
            imageOption
          } = attributes;

          // Display product titles in FormTokenField (value att).
          const displayList = getProducts?.records?.filter(item => productList?.includes(item.id)).map(item => item.title.rendered);

          // FormTokenField control suggestions.
          const suggestions = getProducts?.records?.map(stream => {
            return stream.title.rendered;
          });
          // Adding / removing products.
          const onChangeProductList = newList => {
            const newProductIds = getProducts?.records?.filter(item => newList.includes(item.title.rendered)).map(item => item.id);
            const newProducts = getProducts?.records?.filter(item => newList.includes(item.title.rendered));
            const productsData = getProducts?.records?.filter(item => newList.includes(item.title.rendered)).map(item => {
              return {
                id: item.id,
                title: item.title.raw,
                excerpt: item.excerpt.raw
              };
            });
            setAttributes({
              productList: newProductIds,
              products: newProducts,
              productsData: productsData
            });
          };

          // IMAGE CONTROLS.
          const onSelectImage = media => {
            if (!clearMarkersOnImageChange()) {
              return;
            } else {
              setAttributes({
                mediaURL: media.url,
                mediaID: media.id
              });
            }
          };
          const onRemoveImage = () => {
            if (!clearMarkersOnImageChange()) {
              return;
            } else {
              setAttributes({
                mediaURL: null,
                mediaID: null
              });
            }
          };
          const clearMarkersOnImageChange = () => {
            if (markers.length > 0 && mediaID) {
              if (!confirm("All existing markers will be removed - are you sure?")) {
                return false;
              }
              ;
            }
            setAttributes({
              markers: []
            });
            return true;
          };

          // MARKER CONTROLS.
          const markerToggle = markerIndex => {
            const updatedMarkers = [...markers];
            updatedMarkers[markerIndex].active = !updatedMarkers[markerIndex].active;
            setAttributes({
              markers: updatedMarkers
            });
          };
          const markerRemove = markerIndex => {
            const updatedMarkers = [...markers];
            updatedMarkers.splice(markerIndex, 1);
            setAttributes({
              markers: updatedMarkers
            });
          };
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select products', 'woo-lookbook'),
            initialOpen: true
          }, getProducts.isResolving ? (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading products list', 'woo-lookblock') : (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormTokenField, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Start typing product name…', 'woo-lookblock'),
            value: displayList,
            suggestions: suggestions,
            onChange: onChangeProductList
          })), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lookbook image', 'woo-lookbook'),
            initialOpen: false
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose image for lookbook item', 'woo-lookblock'),
            onSelect: onSelectImage,
            allowedTypes: "image",
            value: mediaID,
            render: _ref2 => {
              let {
                open
              } = _ref2;
              return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
                className: mediaID ? 'image-button' : 'button button-large',
                onClick: open
              }, !mediaID ? (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Image', 'woo-lookblock') : (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Image', 'woo-lookblock'));
            }
          }), mediaID && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
            icon: "trash",
            onClick: onRemoveImage,
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove image', 'woo-lookblock')
          }))), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, mediaID ? (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            src: mediaURL,
            alt: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Lookbook image', 'woo-lookblock')
          }) : (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No LookBook image selected', 'woo-lookblock')), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image options', 'woo-lookbook'),
            value: imageOption,
            options: [{
              label: 'No background image',
              value: 'backimage-none'
            }, {
              label: 'Also as background',
              value: 'backimage-same'
            }, {
              label: 'Only as background',
              value: 'backimage-only'
            }, {
              label: 'Custom background image',
              value: 'backimage-custom'
            }],
            onChange: value => setAttributes({
              imageOption: value
            })
          }))), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lookbook layout', 'woo-lookbook'),
            initialOpen: false
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Direction', 'woo-lookbook'),
            value: direction,
            options: [{
              label: 'Row - products left',
              value: 'row'
            }, {
              label: 'Row - image left',
              value: 'row-reverse'
            }, {
              label: 'Column - products on top',
              value: 'column'
            }, {
              label: 'Column - image on top',
              value: 'column-reverse'
            }],
            onChange: value => setAttributes({
              direction: value
            })
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vertical align', 'woo-lookbook'),
            value: valign,
            options: [{
              label: 'Top',
              value: 'flex-start'
            }, {
              label: 'Center',
              value: 'center'
            }, {
              label: 'Bottom',
              value: 'flex-end'
            }],
            onChange: value => setAttributes({
              valign: value
            })
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Width",
            value: productsWidth,
            min: 0,
            max: 100,
            onChange: value => setAttributes({
              productsWidth: value
            })
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Gap",
            value: flexgap,
            onChange: value => setAttributes({
              flexgap: value
            }),
            min: 0,
            max: 40
          })), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Products layout', 'woo-lookbook'),
            initialOpen: false
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Columns",
            value: columns,
            onChange: value => setAttributes({
              columns: value
            }),
            min: 1,
            max: 4
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
            label: "Gap",
            value: gap,
            onChange: value => setAttributes({
              gap: value
            }),
            min: 0,
            max: 40
          })), mediaID && markers && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product markers', 'woo-lookblock'),
            initialOpen: true
          }, markers.map((marker, markerIndex) => (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            key: markerIndex,
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
            label: marker.productTitle ? marker.productTitle : marker.name,
            checked: marker.active,
            onChange: () => markerToggle(markerIndex)
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
            icon: "trash",
            onClick: () => markerRemove(markerIndex),
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove marker', 'woo-lookblock')
          }))), markers.length > 0 && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            isSecondary: true,
            isSmall: true,
            onClick: () => setAttributes({
              markers: []
            })
          }, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove All Markers', 'woo-lookblock')), markers.length == 0 && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Click on lookbook image to add markers', 'woo-lookblock'))));
        };
/* harmony default export */ __webpack_exports__["default"] = (InspectorControlsComponent);

        /***/
}),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ Edit; }
          /* harmony export */
});
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _components_productGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/productGrid */ "./src/components/productGrid.js");
/* harmony import */ var _controls_inspectorControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls/inspectorControls */ "./src/controls/inspectorControls.js");
/* harmony import */ var _components_marker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/marker */ "./src/components/marker.js");
/* harmony import */ var _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/markerFunctions */ "./src/functions/markerFunctions.js");

        /**
         * WordPress dependenices.
         */





        // For server rendering in render.php
        // import ServerSideRender from '@wordpress/server-side-render';

        /**
         * Internal dependencies.
         */





        // Functions.


        /**
         * The edit function describes the structure of your block in the context of the
         * editor. This represents what the editor will render when the block is used.
         *
         * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
         *
         * @return {WPElement} Element to render.
         */
        function Edit(_ref) {
          let {
            attributes,
            setAttributes
          } = _ref;
          const blockProps = (0, _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
          const {
            products,
            productList,
            mediaURL,
            columns,
            gap,
            valign,
            productsWidth,
            direction,
            flexgap,
            markers,
            selectedMarker,
            selectedProduct,
            isModalOpen,
            imageOption
          } = attributes;

          // Product select options for modal, on marker click.
          const producOptionsStart = [{
            label: 'Select a product',
            value: ''
          }];
          const producOptions = products?.map(product => ({
            label: product.title.rendered,
            value: JSON.stringify([product.id, product.title.rendered])
          }));

          // Block Flex container and product grid styles.
          const flexAlignItems = dir => {
            // If direction is 'column' or 'column-reverse' set align fixed.
            return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
          };

          const flexContainerStyles = {
            flexDirection: direction,
            alignItems: flexAlignItems(direction),
            gap: flexgap,
            justifyContent: 'center'
          };
          const gridStyle = {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`
          };
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_controls_inspectorControls__WEBPACK_IMPORTED_MODULE_7__["default"], {
            attributes: attributes,
            setAttributes: setAttributes
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, imageOption !== 'backimage-none' && mediaURL && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "cover-image",
            style: {
              backgroundImage: `url(${mediaURL})`
            }
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-container",
            style: flexContainerStyles
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-block products-grid-container",
            style: {
              width: `${productsWidth}%`
            }
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_productGrid__WEBPACK_IMPORTED_MODULE_6__["default"], {
            productList: productList,
            columns: columns,
            gap: gap,
            context: "edit",
            style: gridStyle
          })), mediaURL && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-block image-container",
            style: {
              width: `${100 - productsWidth}%`,
              position: 'relative'
            }
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            className: "lookbook-image",
            src: mediaURL,
            alt: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lookbook image', 'woo-lookblock'),
            onClick: () => (0, _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__.addNewMarker)(event, markers, setAttributes)
          }), markers?.length > 0 && markers.map((marker, index) => (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_marker__WEBPACK_IMPORTED_MODULE_8__["default"], {
            key: `marker-${marker.id}`,
            marker: marker,
            onDoubleClick: () => (0, _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__.assignProductToMarker)(marker, setAttributes),
            onMouseOver: _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__.onMarkerOver,
            onMouseOut: _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__.onMarkerOut
          }))))), isModalOpen && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
            title: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Assign a product to this marker', 'woo-lookblock'),
            onRequestClose: () => setAttributes({
              isModalOpen: false,
              selectedMarker: null
            })
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
            label: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Products', 'woo-lookblock'),
            value: selectedProduct ? JSON.stringify([selectedProduct.id, selectedProduct.name]) : '',
            options: producOptionsStart.concat(producOptions),
            onChange: value => (0, _functions_markerFunctions__WEBPACK_IMPORTED_MODULE_9__.onProductSelect)(value, markers, selectedMarker, setAttributes)
          })));
        }

        /***/
}),

/***/ "./src/functions/markerFunctions.js":
/*!******************************************!*\
  !*** ./src/functions/markerFunctions.js ***!
  \******************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewMarker": function () { return /* binding */ addNewMarker; },
/* harmony export */   "assignProductToMarker": function () { return /* binding */ assignProductToMarker; },
/* harmony export */   "onMarkerOut": function () { return /* binding */ onMarkerOut; },
/* harmony export */   "onMarkerOver": function () { return /* binding */ onMarkerOver; },
/* harmony export */   "onProductSelect": function () { return /* binding */ onProductSelect; }
          /* harmony export */
});
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
        /**
         * External dependecies.
         */
        // For creating unique id's.

        /**
         * Adding markers when clicked on image (in div container)
         * captures click coordinates relative to image container
         * and adds marker to marker objects, with x,y and other properties.
         * 
         * @param {Event} event 
         * @param {Object} markers 
         * @param {Function} setAttributes 
         */
        const addNewMarker = (event, markers, setAttributes) => {
          const rect = event.target.getBoundingClientRect();
          const xPos = (event.clientX - rect.left) / rect.width * 100;
          const yPos = (event.clientY - rect.top) / rect.height * 100;
          const newMarker = {
            x: xPos,
            y: yPos,
            id: (0, uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
            name: 'Double click on marker to assign product.',
            active: true,
            productId: null,
            productTitle: null
          };
          const updatedMarkers = markers?.concat(newMarker);
          setAttributes({
            markers: updatedMarkers
          });
        };

        /**
         * When a marker is clicked, the modal opens to assign product to the marker.
         * @param {object} marker 
         * @param {Function} setAttributes 
         */
        const assignProductToMarker = (marker, setAttributes) => {
          setAttributes({
            selectedMarker: marker.id
          });
          setAttributes({
            isModalOpen: true
          });
        };

        /**
         * Select product from products object and assign to marker.
         * Select component is in modal component.
         * @param {String} value 
         */
        const onProductSelect = (value, markers, selectedMarker, setAttributes) => {
          const [productId, productTitle] = JSON.parse(value);
          const updatedMarkers = markers?.map(marker => {
            if (marker.id === selectedMarker) {
              return {
                ...marker,
                productId,
                productTitle
              };
            }
            return marker;
          });
          setAttributes({
            markers: updatedMarkers
          });
          setAttributes({
            selectedProduct: value
          });
          setAttributes({
            isModalOpen: false
          });
        };

        /**
         * Add 'highlight' class name to assigned product
         * @param {object} marker 
         */
        const onMarkerOver = marker => {
          const productId = marker?.productId;
          const product = document.querySelector(`[data-product-id="${productId}"]`);
          if (product) {
            product.classList.add('highlighted');
          }
          ;
        };

        /**
         * Remove highligt class name from assigned product.
         * @param {object} marker 
         */
        const onMarkerOut = marker => {
          const productId = marker?.productId;
          const product = document.querySelector(`[data-product-id="${productId}"]`);
          if (product) {
            product.classList.remove('highlighted');
          }
        };

        /***/
}),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
        /**
         * Registers a block with a unique name ( Woo Lookblock ) and an object.
         *
         * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
         */


        /**
         * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
         * All files containing `style` keyword are bundled together. The code used
         * gets applied both to the front of your site and to the editor.
         *
         * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
         */


        /**
         * Internal dependencies
         */




        /**
         * Every block starts by registering a new block type definition.
         *
         * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
         */
        (0, _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
          /**
           * @see ./edit.js
           */
          edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
          /**
           * @see ./save.js 
           */
          save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
        });

        /***/
}),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _components_productGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/productGrid */ "./src/components/productGrid.js");
/* harmony import */ var _components_marker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/marker */ "./src/components/marker.js");

        /**
         * WordPress dependenices.
         */





        /**
         * Internal dependencies.
         */



        const Save = _ref => {
          let {
            attributes
          } = _ref;
          const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save();
          const {
            products,
            productList,
            mediaURL,
            columns,
            gap,
            valign,
            productsWidth,
            direction,
            flexgap,
            markers,
            imageOption
          } = attributes;

          // Block Flex container and product grid styles.
          const flexAlignItems = dir => {
            // If direction is 'column' or 'column-reverse' set align fixed.
            return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
          };

          const flexContainerStyles = {
            flexDirection: direction,
            alignItems: flexAlignItems(direction),
            gap: flexgap,
            justifyContent: 'center'
          };
          const gridStyle = {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap}px`
          };
          return (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, imageOption !== 'backimage-none' && mediaURL && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "cover-image",
            style: {
              backgroundImage: `url(${mediaURL})`
            }
          }), (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-container",
            style: flexContainerStyles
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-block products-grid-container",
            style: {
              width: `${productsWidth}%`
            }
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_productGrid__WEBPACK_IMPORTED_MODULE_6__["default"], {
            productList: productList,
            columns: columns,
            gap: gap,
            context: "save",
            style: gridStyle
          })), mediaURL && (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "flex-block image-container",
            style: {
              width: `${100 - productsWidth}%`,
              position: 'relative'
            }
          }, (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            className: "lookbook-image",
            src: mediaURL,
            alt: (0, _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lookbook image', 'woo-lookblock')
          }), markers?.length > 0 && markers.map((marker, index) => (0, _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_marker__WEBPACK_IMPORTED_MODULE_7__["default"], {
            key: `marker-${index}`,
            marker: marker
          }))))));
        };
/* harmony default export */ __webpack_exports__["default"] = (Save);

        /***/
}),

/***/ "./node_modules/dompurify/dist/purify.js":
/*!***********************************************!*\
  !*** ./node_modules/dompurify/dist/purify.js ***!
  \***********************************************/
/***/ (function (module) {

        /*! @license DOMPurify 3.0.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.1/LICENSE */

        (function (global, factory) {
          true ? module.exports = factory() :
            0;
        })(this, (function () {
          'use strict';

          function _typeof(obj) {
            "@babel/helpers - typeof";

            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
              return typeof obj;
            } : function (obj) {
              return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
              o.__proto__ = p;
              return o;
            };

            return _setPrototypeOf(o, p);
          }

          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;

            try {
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { }));
              return true;
            } catch (e) {
              return false;
            }
          }

          function _construct(Parent, args, Class) {
            if (_isNativeReflectConstruct()) {
              _construct = Reflect.construct;
            } else {
              _construct = function _construct(Parent, args, Class) {
                var a = [null];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a);
                var instance = new Constructor();
                if (Class) _setPrototypeOf(instance, Class.prototype);
                return instance;
              };
            }

            return _construct.apply(null, arguments);
          }

          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
          }

          function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
          }

          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }

          function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
          }

          function _iterableToArrayLimit(arr, i) {
            var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

            if (_i == null) return;
            var _arr = [];
            var _n = true;
            var _d = false;

            var _s, _e;

            try {
              for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;

            for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

            return arr2;
          }

          function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }

          function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }

          function _createForOfIteratorHelper(o, allowArrayLike) {
            var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

            if (!it) {
              if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;

                var F = function () { };

                return {
                  s: F,
                  n: function () {
                    if (i >= o.length) return {
                      done: true
                    };
                    return {
                      done: false,
                      value: o[i++]
                    };
                  },
                  e: function (e) {
                    throw e;
                  },
                  f: F
                };
              }

              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }

            var normalCompletion = true,
              didErr = false,
              err;
            return {
              s: function () {
                it = it.call(o);
              },
              n: function () {
                var step = it.next();
                normalCompletion = step.done;
                return step;
              },
              e: function (e) {
                didErr = true;
                err = e;
              },
              f: function () {
                try {
                  if (!normalCompletion && it.return != null) it.return();
                } finally {
                  if (didErr) throw err;
                }
              }
            };
          }

          var entries = Object.entries,
            setPrototypeOf = Object.setPrototypeOf,
            isFrozen = Object.isFrozen,
            getPrototypeOf = Object.getPrototypeOf,
            getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          var freeze = Object.freeze,
            seal = Object.seal,
            create = Object.create; // eslint-disable-line import/no-mutable-exports

          var _ref = typeof Reflect !== 'undefined' && Reflect,
            apply = _ref.apply,
            construct = _ref.construct;

          if (!apply) {
            apply = function apply(fun, thisValue, args) {
              return fun.apply(thisValue, args);
            };
          }

          if (!freeze) {
            freeze = function freeze(x) {
              return x;
            };
          }

          if (!seal) {
            seal = function seal(x) {
              return x;
            };
          }

          if (!construct) {
            construct = function construct(Func, args) {
              return _construct(Func, _toConsumableArray(args));
            };
          }

          var arrayForEach = unapply(Array.prototype.forEach);
          var arrayPop = unapply(Array.prototype.pop);
          var arrayPush = unapply(Array.prototype.push);
          var stringToLowerCase = unapply(String.prototype.toLowerCase);
          var stringToString = unapply(String.prototype.toString);
          var stringMatch = unapply(String.prototype.match);
          var stringReplace = unapply(String.prototype.replace);
          var stringIndexOf = unapply(String.prototype.indexOf);
          var stringTrim = unapply(String.prototype.trim);
          var regExpTest = unapply(RegExp.prototype.test);
          var typeErrorCreate = unconstruct(TypeError);
          function unapply(func) {
            return function (thisArg) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

              return apply(func, thisArg, args);
            };
          }
          function unconstruct(func) {
            return function () {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return construct(func, args);
            };
          }
          /* Add properties to a lookup table */

          function addToSet(set, array, transformCaseFunc) {
            transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;

            if (setPrototypeOf) {
              // Make 'in' and truthy checks like Boolean(set.constructor)
              // independent of any properties defined on Object.prototype.
              // Prevent prototype setters from intercepting set as a this value.
              setPrototypeOf(set, null);
            }

            var l = array.length;

            while (l--) {
              var element = array[l];

              if (typeof element === 'string') {
                var lcElement = transformCaseFunc(element);

                if (lcElement !== element) {
                  // Config presets (e.g. tags.js, attrs.js) are immutable.
                  if (!isFrozen(array)) {
                    array[l] = lcElement;
                  }

                  element = lcElement;
                }
              }

              set[element] = true;
            }

            return set;
          }
          /* Shallow clone an object */

          function clone(object) {
            var newObject = create(null);

            var _iterator = _createForOfIteratorHelper(entries(object)),
              _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _slicedToArray(_step.value, 2),
                  property = _step$value[0],
                  value = _step$value[1];

                newObject[property] = value;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return newObject;
          }
          /* This method automatically checks if the prop is function
           * or getter and behaves accordingly. */

          function lookupGetter(object, prop) {
            while (object !== null) {
              var desc = getOwnPropertyDescriptor(object, prop);

              if (desc) {
                if (desc.get) {
                  return unapply(desc.get);
                }

                if (typeof desc.value === 'function') {
                  return unapply(desc.value);
                }
              }

              object = getPrototypeOf(object);
            }

            function fallbackValue(element) {
              console.warn('fallback value for', element);
              return null;
            }

            return fallbackValue;
          }

          var html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

          var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
          var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
          // We still need to know them so that we can do namespace
          // checks properly in case one wants to add them to
          // allow-list.

          var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
          var mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']); // Similarly to SVG, we want to know all MathML elements,
          // even those that we disallow by default.

          var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
          var text = freeze(['#text']);

          var html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
          var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
          var mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
          var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

          var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

          var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
          var TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
          var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

          var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

          var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
          );
          var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
          var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
          );
          var DOCTYPE_NAME = seal(/^html$/i);

          var getGlobal = function getGlobal() {
            return typeof window === 'undefined' ? null : window;
          };
          /**
           * Creates a no-op policy for internal use only.
           * Don't export this function outside this module!
           * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
           * @param {Document} document The document object (to determine policy name suffix)
           * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
           * are not supported).
           */


          var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
            if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
              return null;
            } // Allow the callers to control the unique policy name
            // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
            // Policy creation with duplicate names throws in Trusted Types.


            var suffix = null;
            var ATTR_NAME = 'data-tt-policy-suffix';

            if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
              suffix = document.currentScript.getAttribute(ATTR_NAME);
            }

            var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

            try {
              return trustedTypes.createPolicy(policyName, {
                createHTML: function createHTML(html) {
                  return html;
                },
                createScriptURL: function createScriptURL(scriptUrl) {
                  return scriptUrl;
                }
              });
            } catch (_) {
              // Policy creation failed (most likely another DOMPurify script has
              // already run). Skip creating the policy, as this will only cause errors
              // if TT are enforced.
              console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
              return null;
            }
          };

          function createDOMPurify() {
            var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

            var DOMPurify = function DOMPurify(root) {
              return createDOMPurify(root);
            };
            /**
             * Version label, exposed for easier checks
             * if DOMPurify is up to date or not
             */


            DOMPurify.version = '3.0.1';
            /**
             * Array of elements that DOMPurify removed during sanitation.
             * Empty if nothing was removed.
             */

            DOMPurify.removed = [];

            if (!window || !window.document || window.document.nodeType !== 9) {
              // Not running in a browser, provide a factory function
              // so that you can pass your own Window
              DOMPurify.isSupported = false;
              return DOMPurify;
            }

            var originalDocument = window.document;
            var document = window.document;
            var DocumentFragment = window.DocumentFragment,
              HTMLTemplateElement = window.HTMLTemplateElement,
              Node = window.Node,
              Element = window.Element,
              NodeFilter = window.NodeFilter,
              _window$NamedNodeMap = window.NamedNodeMap,
              NamedNodeMap = _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
              HTMLFormElement = window.HTMLFormElement,
              DOMParser = window.DOMParser,
              trustedTypes = window.trustedTypes;
            var ElementPrototype = Element.prototype;
            var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
            var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
            var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
            var getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
            // new document created via createHTMLDocument. As per the spec
            // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
            // a new empty registry is used when creating a template contents owner
            // document, so we use that as our parent document to ensure nothing
            // is inherited.

            if (typeof HTMLTemplateElement === 'function') {
              var template = document.createElement('template');

              if (template.content && template.content.ownerDocument) {
                document = template.content.ownerDocument;
              }
            }

            var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

            var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
            var _document = document,
              implementation = _document.implementation,
              createNodeIterator = _document.createNodeIterator,
              createDocumentFragment = _document.createDocumentFragment,
              getElementsByTagName = _document.getElementsByTagName;
            var importNode = originalDocument.importNode;
            var hooks = {};
            /**
             * Expose whether this browser supports running the full DOMPurify.
             */

            DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined';
            var MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
              ERB_EXPR$1 = ERB_EXPR,
              TMPLIT_EXPR$1 = TMPLIT_EXPR,
              DATA_ATTR$1 = DATA_ATTR,
              ARIA_ATTR$1 = ARIA_ATTR,
              IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
              ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
            var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
            /**
             * We consider the elements and attributes below to be safe. Ideally
             * don't add any new ones but feel free to remove unwanted ones.
             */

            /* allowed element names */

            var ALLOWED_TAGS = null;
            var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
            /* Allowed attribute names */

            var ALLOWED_ATTR = null;
            var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
            /*
             * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
             * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
             * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
             * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
             */

            var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
              tagNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
              },
              attributeNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
              },
              allowCustomizedBuiltInElements: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: false
              }
            }));
            /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

            var FORBID_TAGS = null;
            /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

            var FORBID_ATTR = null;
            /* Decide if ARIA attributes are okay */

            var ALLOW_ARIA_ATTR = true;
            /* Decide if custom data attributes are okay */

            var ALLOW_DATA_ATTR = true;
            /* Decide if unknown protocols are okay */

            var ALLOW_UNKNOWN_PROTOCOLS = false;
            /* Decide if self-closing tags in attributes are allowed.
             * Usually removed due to a mXSS issue in jQuery 3.0 */

            var ALLOW_SELF_CLOSE_IN_ATTR = true;
            /* Output should be safe for common template engines.
             * This means, DOMPurify removes data attributes, mustaches and ERB
             */

            var SAFE_FOR_TEMPLATES = false;
            /* Decide if document with <html>... should be returned */

            var WHOLE_DOCUMENT = false;
            /* Track whether config is already set on this instance of DOMPurify. */

            var SET_CONFIG = false;
            /* Decide if all elements (e.g. style, script) must be children of
             * document.body. By default, browsers might move them to document.head */

            var FORCE_BODY = false;
            /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
             * string (or a TrustedHTML object if Trusted Types are supported).
             * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
             */

            var RETURN_DOM = false;
            /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
             * string  (or a TrustedHTML object if Trusted Types are supported) */

            var RETURN_DOM_FRAGMENT = false;
            /* Try to return a Trusted Type object instead of a string, return a string in
             * case Trusted Types are not supported  */

            var RETURN_TRUSTED_TYPE = false;
            /* Output should be free from DOM clobbering attacks?
             * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
             */

            var SANITIZE_DOM = true;
            /* Achieve full DOM Clobbering protection by isolating the namespace of named
             * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
             *
             * HTML/DOM spec rules that enable DOM Clobbering:
             *   - Named Access on Window (§7.3.3)
             *   - DOM Tree Accessors (§3.1.5)
             *   - Form Element Parent-Child Relations (§4.10.3)
             *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
             *   - HTMLCollection (§4.2.10.2)
             *
             * Namespace isolation is implemented by prefixing `id` and `name` attributes
             * with a constant string, i.e., `user-content-`
             */

            var SANITIZE_NAMED_PROPS = false;
            var SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
            /* Keep element content when removing element? */

            var KEEP_CONTENT = true;
            /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
             * of importing it into a new Document and returning a sanitized copy */

            var IN_PLACE = false;
            /* Allow usage of profiles like html, svg and mathMl */

            var USE_PROFILES = {};
            /* Tags to ignore content of when KEEP_CONTENT is true */

            var FORBID_CONTENTS = null;
            var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
            /* Tags that are safe for data: URIs */

            var DATA_URI_TAGS = null;
            var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
            /* Attributes safe for values like "javascript:" */

            var URI_SAFE_ATTRIBUTES = null;
            var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
            var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
            var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
            var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
            /* Document namespace */

            var NAMESPACE = HTML_NAMESPACE;
            var IS_EMPTY_INPUT = false;
            /* Allowed XHTML+XML namespaces */

            var ALLOWED_NAMESPACES = null;
            var DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
            /* Parsing of strict XHTML documents */

            var PARSER_MEDIA_TYPE;
            var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
            var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
            var transformCaseFunc;
            /* Keep a reference to config to pass to hooks */

            var CONFIG = null;
            /* Ideally, do not touch anything below this line */

            /* ______________________________________________ */

            var formElement = document.createElement('form');

            var isRegexOrFunction = function isRegexOrFunction(testValue) {
              return testValue instanceof RegExp || testValue instanceof Function;
            };
            /**
             * _parseConfig
             *
             * @param  {Object} cfg optional config literal
             */
            // eslint-disable-next-line complexity


            var _parseConfig = function _parseConfig(cfg) {
              if (CONFIG && CONFIG === cfg) {
                return;
              }
              /* Shield configuration object from tampering */


              if (!cfg || _typeof(cfg) !== 'object') {
                cfg = {};
              }
              /* Shield configuration object from prototype pollution */


              cfg = clone(cfg);
              PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
                SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

              transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
              /* Set configuration parameters */

              ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
              ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
              ALLOWED_NAMESPACES = 'ALLOWED_NAMESPACES' in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
              URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
                cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
                transformCaseFunc // eslint-disable-line indent
              ) // eslint-disable-line indent
                : DEFAULT_URI_SAFE_ATTRIBUTES;
              DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
                cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
                transformCaseFunc // eslint-disable-line indent
              ) // eslint-disable-line indent
                : DEFAULT_DATA_URI_TAGS;
              FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
              FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
              FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
              USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
              ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

              ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

              ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

              ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true

              SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

              WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

              RETURN_DOM = cfg.RETURN_DOM || false; // Default false

              RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

              RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

              FORCE_BODY = cfg.FORCE_BODY || false; // Default false

              SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

              SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false

              KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

              IN_PLACE = cfg.IN_PLACE || false; // Default false

              IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
              NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
              CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};

              if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
                CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
              }

              if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
                CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
              }

              if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
                CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
              }

              if (SAFE_FOR_TEMPLATES) {
                ALLOW_DATA_ATTR = false;
              }

              if (RETURN_DOM_FRAGMENT) {
                RETURN_DOM = true;
              }
              /* Parse profile info */


              if (USE_PROFILES) {
                ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
                ALLOWED_ATTR = [];

                if (USE_PROFILES.html === true) {
                  addToSet(ALLOWED_TAGS, html$1);
                  addToSet(ALLOWED_ATTR, html);
                }

                if (USE_PROFILES.svg === true) {
                  addToSet(ALLOWED_TAGS, svg$1);
                  addToSet(ALLOWED_ATTR, svg);
                  addToSet(ALLOWED_ATTR, xml);
                }

                if (USE_PROFILES.svgFilters === true) {
                  addToSet(ALLOWED_TAGS, svgFilters);
                  addToSet(ALLOWED_ATTR, svg);
                  addToSet(ALLOWED_ATTR, xml);
                }

                if (USE_PROFILES.mathMl === true) {
                  addToSet(ALLOWED_TAGS, mathMl$1);
                  addToSet(ALLOWED_ATTR, mathMl);
                  addToSet(ALLOWED_ATTR, xml);
                }
              }
              /* Merge configuration parameters */


              if (cfg.ADD_TAGS) {
                if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
                  ALLOWED_TAGS = clone(ALLOWED_TAGS);
                }

                addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
              }

              if (cfg.ADD_ATTR) {
                if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
                  ALLOWED_ATTR = clone(ALLOWED_ATTR);
                }

                addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
              }

              if (cfg.ADD_URI_SAFE_ATTR) {
                addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
              }

              if (cfg.FORBID_CONTENTS) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
                  FORBID_CONTENTS = clone(FORBID_CONTENTS);
                }

                addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
              }
              /* Add #text in case KEEP_CONTENT is set to true */


              if (KEEP_CONTENT) {
                ALLOWED_TAGS['#text'] = true;
              }
              /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


              if (WHOLE_DOCUMENT) {
                addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
              }
              /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


              if (ALLOWED_TAGS.table) {
                addToSet(ALLOWED_TAGS, ['tbody']);
                delete FORBID_TAGS.tbody;
              } // Prevent further manipulation of configuration.
              // Not available in IE8, Safari 5, etc.


              if (freeze) {
                freeze(cfg);
              }

              CONFIG = cfg;
            };

            var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
            var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
            // namespace. We need to specify them explicitly
            // so that they don't get erroneously deleted from
            // HTML namespace.

            var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
            /* Keep track of all possible SVG and MathML tags
             * so that we can perform the namespace checks
             * correctly. */

            var ALL_SVG_TAGS = addToSet({}, svg$1);
            addToSet(ALL_SVG_TAGS, svgFilters);
            addToSet(ALL_SVG_TAGS, svgDisallowed);
            var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
            addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
            /**
             *
             *
             * @param  {Element} element a DOM element whose namespace is being checked
             * @returns {boolean} Return false if the element has a
             *  namespace that a spec-compliant parser would never
             *  return. Return true otherwise.
             */

            var _checkValidNamespace = function _checkValidNamespace(element) {
              var parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
              // can be null. We just simulate parent in this case.

              if (!parent || !parent.tagName) {
                parent = {
                  namespaceURI: NAMESPACE,
                  tagName: 'template'
                };
              }

              var tagName = stringToLowerCase(element.tagName);
              var parentTagName = stringToLowerCase(parent.tagName);

              if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
                return false;
              }

              if (element.namespaceURI === SVG_NAMESPACE) {
                // The only way to switch from HTML namespace to SVG
                // is via <svg>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) {
                  return tagName === 'svg';
                } // The only way to switch from MathML to SVG is via`
                // svg if parent is either <annotation-xml> or MathML
                // text integration points.


                if (parent.namespaceURI === MATHML_NAMESPACE) {
                  return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
                } // We only allow elements that are defined in SVG
                // spec. All others are disallowed in SVG namespace.


                return Boolean(ALL_SVG_TAGS[tagName]);
              }

              if (element.namespaceURI === MATHML_NAMESPACE) {
                // The only way to switch from HTML namespace to MathML
                // is via <math>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) {
                  return tagName === 'math';
                } // The only way to switch from SVG to MathML is via
                // <math> and HTML integration points


                if (parent.namespaceURI === SVG_NAMESPACE) {
                  return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
                } // We only allow elements that are defined in MathML
                // spec. All others are disallowed in MathML namespace.


                return Boolean(ALL_MATHML_TAGS[tagName]);
              }

              if (element.namespaceURI === HTML_NAMESPACE) {
                // The only way to switch from SVG to HTML is via
                // HTML integration points, and from MathML to HTML
                // is via MathML text integration points
                if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
                  return false;
                }

                if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
                  return false;
                } // We disallow tags that are specific for MathML
                // or SVG and should never appear in HTML namespace


                return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
              } // For XHTML and XML documents that support custom namespaces


              if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
                return true;
              } // The code should never reach this place (this means
              // that the element somehow got namespace that is not
              // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
              // Return false just in case.


              return false;
            };
            /**
             * _forceRemove
             *
             * @param  {Node} node a DOM node
             */


            var _forceRemove = function _forceRemove(node) {
              arrayPush(DOMPurify.removed, {
                element: node
              });

              try {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                node.parentNode.removeChild(node);
              } catch (_) {
                node.remove();
              }
            };
            /**
             * _removeAttribute
             *
             * @param  {String} name an Attribute name
             * @param  {Node} node a DOM node
             */


            var _removeAttribute = function _removeAttribute(name, node) {
              try {
                arrayPush(DOMPurify.removed, {
                  attribute: node.getAttributeNode(name),
                  from: node
                });
              } catch (_) {
                arrayPush(DOMPurify.removed, {
                  attribute: null,
                  from: node
                });
              }

              node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

              if (name === 'is' && !ALLOWED_ATTR[name]) {
                if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
                  try {
                    _forceRemove(node);
                  } catch (_) { }
                } else {
                  try {
                    node.setAttribute(name, '');
                  } catch (_) { }
                }
              }
            };
            /**
             * _initDocument
             *
             * @param  {String} dirty a string of dirty markup
             * @return {Document} a DOM, filled with the dirty markup
             */


            var _initDocument = function _initDocument(dirty) {
              /* Create a HTML document */
              var doc;
              var leadingWhitespace;

              if (FORCE_BODY) {
                dirty = '<remove></remove>' + dirty;
              } else {
                /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
                var matches = stringMatch(dirty, /^[\r\n\t ]+/);
                leadingWhitespace = matches && matches[0];
              }

              if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
                // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
                dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
              }

              var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
              /*
               * Use the DOMParser API by default, fallback later if needs be
               * DOMParser not work for svg when has multiple root element.
               */

              if (NAMESPACE === HTML_NAMESPACE) {
                try {
                  doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
                } catch (_) { }
              }
              /* Use createHTMLDocument in case DOMParser is not available */


              if (!doc || !doc.documentElement) {
                doc = implementation.createDocument(NAMESPACE, 'template', null);

                try {
                  doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
                } catch (_) {// Syntax error if dirtyPayload is invalid xml
                }
              }

              var body = doc.body || doc.documentElement;

              if (dirty && leadingWhitespace) {
                body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
              }
              /* Work on whole document or just its body */


              if (NAMESPACE === HTML_NAMESPACE) {
                return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
              }

              return WHOLE_DOCUMENT ? doc.documentElement : body;
            };
            /**
             * _createIterator
             *
             * @param  {Document} root document/fragment to create iterator for
             * @return {Iterator} iterator instance
             */


            var _createIterator = function _createIterator(root) {
              return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
                NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
            };
            /**
             * _isClobbered
             *
             * @param  {Node} elm element to check for clobbering attacks
             * @return {Boolean} true if clobbered, false if safe
             */


            var _isClobbered = function _isClobbered(elm) {
              return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
            };
            /**
             * _isNode
             *
             * @param  {Node} obj object to check whether it's a DOM node
             * @return {Boolean} true is object is a DOM node
             */


            var _isNode = function _isNode(object) {
              return _typeof(Node) === 'object' ? object instanceof Node : object && _typeof(object) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
            };
            /**
             * _executeHook
             * Execute user configurable hooks
             *
             * @param  {String} entryPoint  Name of the hook's entry point
             * @param  {Node} currentNode node to work on with the hook
             * @param  {Object} data additional hook parameters
             */


            var _executeHook = function _executeHook(entryPoint, currentNode, data) {
              if (!hooks[entryPoint]) {
                return;
              }

              arrayForEach(hooks[entryPoint], function (hook) {
                hook.call(DOMPurify, currentNode, data, CONFIG);
              });
            };
            /**
             * _sanitizeElements
             *
             * @protect nodeName
             * @protect textContent
             * @protect removeChild
             *
             * @param   {Node} currentNode to check for permission to exist
             * @return  {Boolean} true if node was killed, false if left alive
             */


            var _sanitizeElements = function _sanitizeElements(currentNode) {
              var content;
              /* Execute a hook if present */

              _executeHook('beforeSanitizeElements', currentNode, null);
              /* Check if element is clobbered or can clobber */


              if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);

                return true;
              }
              /* Now let's check the element's type and name */


              var tagName = transformCaseFunc(currentNode.nodeName);
              /* Execute a hook if present */

              _executeHook('uponSanitizeElement', currentNode, {
                tagName: tagName,
                allowedTags: ALLOWED_TAGS
              });
              /* Detect mXSS attempts abusing namespace confusion */


              if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
                _forceRemove(currentNode);

                return true;
              }
              /* Remove element if anything forbids its presence */


              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                /* Check if we have a custom element to handle */
                if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
                  if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
                  if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
                }
                /* Keep content except for bad-listed elements */


                if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                  var parentNode = getParentNode(currentNode) || currentNode.parentNode;
                  var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

                  if (childNodes && parentNode) {
                    var childCount = childNodes.length;

                    for (var i = childCount - 1; i >= 0; --i) {
                      parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
                    }
                  }
                }

                _forceRemove(currentNode);

                return true;
              }
              /* Check whether element has a valid namespace */


              if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
                _forceRemove(currentNode);

                return true;
              }
              /* Make sure that older browsers don't get noscript mXSS */


              if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
                _forceRemove(currentNode);

                return true;
              }
              /* Sanitize element content to be template-safe */


              if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
                /* Get the element's text content */
                content = currentNode.textContent;
                content = stringReplace(content, MUSTACHE_EXPR$1, ' ');
                content = stringReplace(content, ERB_EXPR$1, ' ');
                content = stringReplace(content, TMPLIT_EXPR$1, ' ');

                if (currentNode.textContent !== content) {
                  arrayPush(DOMPurify.removed, {
                    element: currentNode.cloneNode()
                  });
                  currentNode.textContent = content;
                }
              }
              /* Execute a hook if present */


              _executeHook('afterSanitizeElements', currentNode, null);

              return false;
            };
            /**
             * _isValidAttribute
             *
             * @param  {string} lcTag Lowercase tag name of containing element.
             * @param  {string} lcName Lowercase attribute name.
             * @param  {string} value Attribute value.
             * @return {Boolean} Returns true if `value` is valid, otherwise false.
             */
            // eslint-disable-next-line complexity


            var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
              /* Make sure attribute cannot clobber */
              if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
                return false;
              }
              /* Allow valid data-* attributes: At least one character after "-"
                  (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
                  XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
                  We don't need to check the value; it's always URI safe. */


              if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)); else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)); else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
                if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
                  // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                  // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
                  _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
                  // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                  lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))); else {
                  return false;
                }
                /* Check value is safe. First, is attr inert? If so, is safe */

              } else if (URI_SAFE_ATTRIBUTES[lcName]); else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))); else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]); else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))); else if (!value); else {
                return false;
              }

              return true;
            };
            /**
             * _basicCustomElementCheck
             * checks if at least one dash is included in tagName, and it's not the first char
             * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
             * @param {string} tagName name of the tag of the node to sanitize
             */


            var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
              return tagName.indexOf('-') > 0;
            };
            /**
             * _sanitizeAttributes
             *
             * @protect attributes
             * @protect nodeName
             * @protect removeAttribute
             * @protect setAttribute
             *
             * @param  {Node} currentNode to sanitize
             */


            var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
              var attr;
              var value;
              var lcName;
              var l;
              /* Execute a hook if present */

              _executeHook('beforeSanitizeAttributes', currentNode, null);

              var attributes = currentNode.attributes;
              /* Check if we have attributes; if not we might have a text node */

              if (!attributes) {
                return;
              }

              var hookEvent = {
                attrName: '',
                attrValue: '',
                keepAttr: true,
                allowedAttributes: ALLOWED_ATTR
              };
              l = attributes.length;
              /* Go backwards over all attributes; safely remove bad ones */

              while (l--) {
                attr = attributes[l];
                var _attr = attr,
                  name = _attr.name,
                  namespaceURI = _attr.namespaceURI;
                value = name === 'value' ? attr.value : stringTrim(attr.value);
                lcName = transformCaseFunc(name);
                /* Execute a hook if present */

                hookEvent.attrName = lcName;
                hookEvent.attrValue = value;
                hookEvent.keepAttr = true;
                hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

                _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

                value = hookEvent.attrValue;
                /* Did the hooks approve of the attribute? */

                if (hookEvent.forceKeepAttr) {
                  continue;
                }
                /* Remove attribute */


                _removeAttribute(name, currentNode);
                /* Did the hooks approve of the attribute? */


                if (!hookEvent.keepAttr) {
                  continue;
                }
                /* Work around a security issue in jQuery 3.0 */


                if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
                  _removeAttribute(name, currentNode);

                  continue;
                }
                /* Sanitize attribute content to be template-safe */


                if (SAFE_FOR_TEMPLATES) {
                  value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
                  value = stringReplace(value, ERB_EXPR$1, ' ');
                  value = stringReplace(value, TMPLIT_EXPR$1, ' ');
                }
                /* Is `value` valid for this attribute? */


                var lcTag = transformCaseFunc(currentNode.nodeName);

                if (!_isValidAttribute(lcTag, lcName, value)) {
                  continue;
                }
                /* Full DOM Clobbering protection via namespace isolation,
                 * Prefix id and name attributes with `user-content-`
                 */


                if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
                  // Remove the attribute with this value
                  _removeAttribute(name, currentNode); // Prefix the value and later re-create the attribute with the sanitized value


                  value = SANITIZE_NAMED_PROPS_PREFIX + value;
                }
                /* Handle attributes that require Trusted Types */


                if (trustedTypesPolicy && _typeof(trustedTypes) === 'object' && typeof trustedTypes.getAttributeType === 'function') {
                  if (namespaceURI); else {
                    switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                      case 'TrustedHTML':
                        value = trustedTypesPolicy.createHTML(value);
                        break;

                      case 'TrustedScriptURL':
                        value = trustedTypesPolicy.createScriptURL(value);
                        break;
                    }
                  }
                }
                /* Handle invalid data-* attribute set by try-catching it */


                try {
                  if (namespaceURI) {
                    currentNode.setAttributeNS(namespaceURI, name, value);
                  } else {
                    /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
                    currentNode.setAttribute(name, value);
                  }

                  arrayPop(DOMPurify.removed);
                } catch (_) { }
              }
              /* Execute a hook if present */


              _executeHook('afterSanitizeAttributes', currentNode, null);
            };
            /**
             * _sanitizeShadowDOM
             *
             * @param  {DocumentFragment} fragment to iterate over recursively
             */


            var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
              var shadowNode;

              var shadowIterator = _createIterator(fragment);
              /* Execute a hook if present */


              _executeHook('beforeSanitizeShadowDOM', fragment, null);

              while (shadowNode = shadowIterator.nextNode()) {
                /* Execute a hook if present */
                _executeHook('uponSanitizeShadowNode', shadowNode, null);
                /* Sanitize tags and elements */


                if (_sanitizeElements(shadowNode)) {
                  continue;
                }
                /* Deep shadow DOM detected */


                if (shadowNode.content instanceof DocumentFragment) {
                  _sanitizeShadowDOM(shadowNode.content);
                }
                /* Check attributes, sanitize if necessary */


                _sanitizeAttributes(shadowNode);
              }
              /* Execute a hook if present */


              _executeHook('afterSanitizeShadowDOM', fragment, null);
            };
            /**
             * Sanitize
             * Public method providing core sanitation functionality
             *
             * @param {String|Node} dirty string or DOM node
             * @param {Object} configuration object
             */
            // eslint-disable-next-line complexity


            DOMPurify.sanitize = function (dirty) {
              var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              var body;
              var importedNode;
              var currentNode;
              var returnNode;
              /* Make sure we have a string to sanitize.
                DO NOT return early, as this will return the wrong type if
                the user has requested a DOM object rather than a string */

              IS_EMPTY_INPUT = !dirty;

              if (IS_EMPTY_INPUT) {
                dirty = '<!-->';
              }
              /* Stringify, in case dirty is an object */


              if (typeof dirty !== 'string' && !_isNode(dirty)) {
                // eslint-disable-next-line no-negated-condition
                if (typeof dirty.toString !== 'function') {
                  throw typeErrorCreate('toString is not a function');
                } else {
                  dirty = dirty.toString();

                  if (typeof dirty !== 'string') {
                    throw typeErrorCreate('dirty is not a string, aborting');
                  }
                }
              }
              /* Return dirty HTML if DOMPurify cannot run */


              if (!DOMPurify.isSupported) {
                return dirty;
              }
              /* Assign config vars */


              if (!SET_CONFIG) {
                _parseConfig(cfg);
              }
              /* Clean up removed elements */


              DOMPurify.removed = [];
              /* Check if dirty is correctly typed for IN_PLACE */

              if (typeof dirty === 'string') {
                IN_PLACE = false;
              }

              if (IN_PLACE) {
                /* Do some early pre-sanitization to avoid unsafe root nodes */
                if (dirty.nodeName) {
                  var tagName = transformCaseFunc(dirty.nodeName);

                  if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                    throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
                  }
                }
              } else if (dirty instanceof Node) {
                /* If dirty is a DOM element, append to an empty document to avoid
                   elements being stripped by the parser */
                body = _initDocument('<!---->');
                importedNode = body.ownerDocument.importNode(dirty, true);

                if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
                  /* Node is already a body, use as is */
                  body = importedNode;
                } else if (importedNode.nodeName === 'HTML') {
                  body = importedNode;
                } else {
                  // eslint-disable-next-line unicorn/prefer-dom-node-append
                  body.appendChild(importedNode);
                }
              } else {
                /* Exit directly if we have nothing to do */
                if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
                  dirty.indexOf('<') === -1) {
                  return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
                }
                /* Initialize the document to work on */


                body = _initDocument(dirty);
                /* Check we have a DOM node from the data */

                if (!body) {
                  return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
                }
              }
              /* Remove first element node (ours) if FORCE_BODY is set */


              if (body && FORCE_BODY) {
                _forceRemove(body.firstChild);
              }
              /* Get node iterator */


              var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
              /* Now start iterating over the created document */


              while (currentNode = nodeIterator.nextNode()) {
                /* Sanitize tags and elements */
                if (_sanitizeElements(currentNode)) {
                  continue;
                }
                /* Shadow DOM detected, sanitize it */


                if (currentNode.content instanceof DocumentFragment) {
                  _sanitizeShadowDOM(currentNode.content);
                }
                /* Check attributes, sanitize if necessary */


                _sanitizeAttributes(currentNode);
              }
              /* If we sanitized `dirty` in-place, return it. */


              if (IN_PLACE) {
                return dirty;
              }
              /* Return sanitized string or DOM */


              if (RETURN_DOM) {
                if (RETURN_DOM_FRAGMENT) {
                  returnNode = createDocumentFragment.call(body.ownerDocument);

                  while (body.firstChild) {
                    // eslint-disable-next-line unicorn/prefer-dom-node-append
                    returnNode.appendChild(body.firstChild);
                  }
                } else {
                  returnNode = body;
                }

                if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
                  /*
                    AdoptNode() is not used because internal state is not reset
                    (e.g. the past names map of a HTMLFormElement), this is safe
                    in theory but we would rather not risk another attack vector.
                    The state that is cloned by importNode() is explicitly defined
                    by the specs.
                  */
                  returnNode = importNode.call(originalDocument, returnNode, true);
                }

                return returnNode;
              }

              var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
              /* Serialize doctype if allowed */

              if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
                serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
              }
              /* Sanitize final string template-safe */


              if (SAFE_FOR_TEMPLATES) {
                serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ');
                serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ');
                serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR$1, ' ');
              }

              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
            };
            /**
             * Public method to set the configuration once
             * setConfig
             *
             * @param {Object} cfg configuration object
             */


            DOMPurify.setConfig = function (cfg) {
              _parseConfig(cfg);

              SET_CONFIG = true;
            };
            /**
             * Public method to remove the configuration
             * clearConfig
             *
             */


            DOMPurify.clearConfig = function () {
              CONFIG = null;
              SET_CONFIG = false;
            };
            /**
             * Public method to check if an attribute value is valid.
             * Uses last set config, if any. Otherwise, uses config defaults.
             * isValidAttribute
             *
             * @param  {string} tag Tag name of containing element.
             * @param  {string} attr Attribute name.
             * @param  {string} value Attribute value.
             * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
             */


            DOMPurify.isValidAttribute = function (tag, attr, value) {
              /* Initialize shared config vars if necessary. */
              if (!CONFIG) {
                _parseConfig({});
              }

              var lcTag = transformCaseFunc(tag);
              var lcName = transformCaseFunc(attr);
              return _isValidAttribute(lcTag, lcName, value);
            };
            /**
             * AddHook
             * Public method to add DOMPurify hooks
             *
             * @param {String} entryPoint entry point for the hook to add
             * @param {Function} hookFunction function to execute
             */


            DOMPurify.addHook = function (entryPoint, hookFunction) {
              if (typeof hookFunction !== 'function') {
                return;
              }

              hooks[entryPoint] = hooks[entryPoint] || [];
              arrayPush(hooks[entryPoint], hookFunction);
            };
            /**
             * RemoveHook
             * Public method to remove a DOMPurify hook at a given entryPoint
             * (pops it from the stack of hooks if more are present)
             *
             * @param {String} entryPoint entry point for the hook to remove
             * @return {Function} removed(popped) hook
             */


            DOMPurify.removeHook = function (entryPoint) {
              if (hooks[entryPoint]) {
                return arrayPop(hooks[entryPoint]);
              }
            };
            /**
             * RemoveHooks
             * Public method to remove all DOMPurify hooks at a given entryPoint
             *
             * @param  {String} entryPoint entry point for the hooks to remove
             */


            DOMPurify.removeHooks = function (entryPoint) {
              if (hooks[entryPoint]) {
                hooks[entryPoint] = [];
              }
            };
            /**
             * RemoveAllHooks
             * Public method to remove all DOMPurify hooks
             *
             */


            DOMPurify.removeAllHooks = function () {
              hooks = {};
            };

            return DOMPurify;
          }

          var purify = createDOMPurify();

          return purify;

        }));
        //# sourceMappingURL=purify.js.map


        /***/
}),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin


        /***/
}),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        __webpack_require__.r(__webpack_exports__);
        // extracted by mini-css-extract-plugin


        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ __webpack_exports__["default"] = ({
          randomUUID
        });

        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function () { return /* binding */ rng; }
          /* harmony export */
});
        // Unique ID creation requires a high quality random # generator. In the browser we therefore
        // require the crypto API and do not support built-in fallback to lower quality random number
        // generators (like Math.random()).
        let getRandomValues;
        const rnds8 = new Uint8Array(16);
        function rng() {
          // lazy load so that environments that need to polyfill have a chance to do so
          if (!getRandomValues) {
            // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
            getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

            if (!getRandomValues) {
              throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
            }
          }

          return getRandomValues(rnds8);
        }

        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unsafeStringify": function () { return /* binding */ unsafeStringify; }
          /* harmony export */
});
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

        /**
         * Convert array of 16 byte values to UUID string format of the form:
         * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
         */

        const byteToHex = [];

        for (let i = 0; i < 256; ++i) {
          byteToHex.push((i + 0x100).toString(16).slice(1));
        }

        function unsafeStringify(arr, offset = 0) {
          // Note: Be careful editing this code!  It's been tuned for performance
          // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
          return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
        }

        function stringify(arr, offset = 0) {
          const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
          // of the following:
          // - One or more input array values don't map to a hex octet (leading to
          // "undefined" in the uuid)
          // - Invalid input values for the RFC `version` or `variant` fields

          if (!(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
            throw TypeError('Stringified UUID is invalid');
          }

          return uuid;
        }

/* harmony default export */ __webpack_exports__["default"] = (stringify);

        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




        function v4(options, buf, offset) {
          if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
            return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
          }

          options = options || {};
          const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

          rnds[6] = rnds[6] & 0x0f | 0x40;
          rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

          if (buf) {
            offset = offset || 0;

            for (let i = 0; i < 16; ++i) {
              buf[offset + i] = rnds[i];
            }

            return buf;
          }

          return (0, _stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
        }

/* harmony default export */ __webpack_exports__["default"] = (v4);

        /***/
}),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


        function validate(uuid) {
          return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
        }

/* harmony default export */ __webpack_exports__["default"] = (validate);

        /***/
}),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function (module) {

        "use strict";
        module.exports = window["React"];

        /***/
}),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function (module) {

        "use strict";
        module.exports = window["wp"]["apiFetch"];

        /***/
}),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function (module) {

        module.exports = window["wp"]["blockEditor"];

        /***/
}),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function (module) {

        module.exports = window["wp"]["blocks"];

        /***/
}),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function (module) {

        module.exports = window["wp"]["components"];

        /***/
}),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function (module) {

        module.exports = window["wp"]["coreData"];

        /***/
}),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function (module) {

        "use strict";
        module.exports = window["wp"]["data"];

        /***/
}),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function (module) {

        module.exports = window["wp"]["element"];

        /***/
}),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function (module) {

        module.exports = window["wp"]["i18n"];

        /***/
}),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function (module) {

        "use strict";
        module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"micemade/woo-lookblock","version":"0.1.0","title":"Woo Lookblock","category":"widgets","icon":"store","description":"Block plugin for creating WooCommerce lookbooks in the block editor.","supports":{"html":false,"color":{},"align":["wide","full","left","right"],"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true}},"attributes":{"products":{"type":"array","default":[]},"productsData":{"type":"array","default":[]},"productList":{"type":"array","default":[]},"mediaID":{"type":"number","default":null},"mediaURL":{"type":"string","default":null},"style":{"type":"object","default":{"color":{"text":"#3a3a3a","background":"#fbf9f4"},"spacing":{"padding":{"top":"20px","right":"20px","bottom":"20px","left":"20px"}}}},"columns":{"type":"number","default":3},"gap":{"type":"number","default":40},"flexgap":{"type":"number","default":40},"productsWidth":{"type":"number","default":50},"valign":{"type":"string","default":"flex-start"},"direction":{"type":"string","default":"row"},"markers":{"type":"array","default":[]},"selectedMarker":{"type":"number","default":null},"selectedProduct":{"type":"string","default":""},"isModalOpen":{"type":"boolean","default":false},"imageOption":{"type":"string","default":"backimage-none"}},"textdomain":"woo-lookblock","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","script":"file:./frontend/index.js"}');

        /***/
})

    /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
      /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
      /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
}
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function () {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function (result, chunkIds, fn, priority) {
/******/ 			if (chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
        /******/
}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function (key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
            /******/
} else {
/******/ 						fulfilled = false;
/******/ 						if (priority < notFulfilled) notFulfilled = priority;
            /******/
}
          /******/
}
/******/ 				if (fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
          /******/
}
        /******/
}
/******/ 			return result;
      /******/
};
    /******/
}();
/******/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function () {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function (module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function () { return module['default']; } :
/******/ 				function () { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
      /******/
};
    /******/
}();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function () {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function (exports, definition) {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
}
        /******/
}
      /******/
};
    /******/
}();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function () {
/******/ 		__webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
    /******/
}();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function () {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function (exports) {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
      /******/
};
    /******/
}();
/******/
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function () {
/******/ 		// no baseURI
/******/
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
      /******/
};
/******/
/******/ 		// no chunk on demand loading
/******/
/******/ 		// no prefetching
/******/
/******/ 		// no preloaded
/******/
/******/ 		// no HMR
/******/
/******/ 		// no HMR manifest
/******/
/******/ 		__webpack_require__.O.j = function (chunkId) { return installedChunks[chunkId] === 0; };
/******/
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function (parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if (chunkIds.some(function (id) { return installedChunks[id] !== 0; })) {
/******/ 				for (moduleId in moreModules) {
/******/ 					if (__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
            /******/
}
          /******/
}
/******/ 				if (runtime) var result = runtime(__webpack_require__);
        /******/
}
/******/ 			if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for (; i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
          /******/
}
/******/ 				installedChunks[chunkId] = 0;
        /******/
}
/******/ 			return __webpack_require__.O(result);
      /******/
}
/******/
/******/ 		var chunkLoadingGlobal = self["webpackChunkwoo_lookblock"] = self["webpackChunkwoo_lookblock"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    /******/
}();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function () { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
  /******/
  /******/
})()
  ;
//# sourceMappingURL=index.js.map