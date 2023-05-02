<?php
/**
 * Plugin Name:       Woo Lookblock
 * Description:       Creating WooCommerce lookbooks in the block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Micemade
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       woo-lookblock
 *
 * @package           micemade
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function micemade_woo_lookblock_block_init() {
	register_block_type( __DIR__ . '/build' );

	// Create nonce value for apiFetch.
	// $nonce = wp_create_nonce( 'wp_rest' );.
	$nonce    = wp_create_nonce( 'wc_store_api' );
	$cart_url = wc_get_cart_url();

	// Javascript variables.
	$js_vars = array(
		'nonce'   => $nonce,
		'cartUrl' => $cart_url,
	);

	// Add JS vars to frontend and editor.
	wp_localize_script(
		'micemade-woo-lookblock-view-script',
		'wooLookblockVars',
		$js_vars
	);
	wp_localize_script(
		'micemade-woo-lookblock-editor-script',
		'wooLookblockVars',
		$js_vars
	);
	wp_add_inline_script(
		'micemade-woo-lookblock-view-script',
		'var wooLookblockVars2 = {"nonce": "' . esc_attr( $nonce ) . '", "cartUrl": "' . esc_url( $cart_url ) . '"};'
	);
	wp_add_inline_script(
		'micemade-woo-lookblock-editor-script',
		'var wooLookblockVars2 = {"nonce": "' . esc_attr( $nonce ) . '", "cartUrl": "' . esc_url( $cart_url ) . '"};'
	);

	wp_set_script_translations( 'micemade-woo-lookblock-view-script', 'woo-lookblock', plugin_dir_path( __FILE__ ) . 'languages/' );
	wp_set_script_translations( 'micemade-woo-lookblock-editor-script', 'woo-lookblock', plugin_dir_path( __FILE__ ) . 'languages/' );

}
add_action( 'init', 'micemade_woo_lookblock_block_init' );
