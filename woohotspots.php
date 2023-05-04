<?php
/**
 * Plugin Name:       WooHotSpots
 * Description:       Creating WooCommerce showcases with image hotspots in the block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Micemade
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       woohotspots
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
function micemade_woohotspots_block_init() {
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
		'micemade-woohotspots-view-script',
		'woohotspotsVars',
		$js_vars
	);
	wp_localize_script(
		'micemade-woohotspots-editor-script',
		'woohotspotsVars',
		$js_vars
	);
	wp_add_inline_script(
		'micemade-woohotspots-view-script',
		'var woohotspotsVars2 = {"nonce": "' . esc_attr( $nonce ) . '", "cartUrl": "' . esc_url( $cart_url ) . '"};'
	);
	wp_add_inline_script(
		'micemade-woohotspots-editor-script',
		'var woohotspotsVars2 = {"nonce": "' . esc_attr( $nonce ) . '", "cartUrl": "' . esc_url( $cart_url ) . '"};'
	);

	wp_set_script_translations( 'micemade-woohotspots-view-script', 'woohotspots', plugin_dir_path( __FILE__ ) . 'languages/' );
	wp_set_script_translations( 'micemade-woohotspots-editor-script', 'woohotspots', plugin_dir_path( __FILE__ ) . 'languages/' );

}
add_action( 'init', 'micemade_woohotspots_block_init' );
