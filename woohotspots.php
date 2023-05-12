<?php
/**
 * Plugin Name:       WooHotSpots
 * Description:       Create WooCommerce product showcases with image hotspots in the block editor.
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
 * Initialize the plugin.
 *
 * @return void
 */
function woohotspots_block_init() {

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	register_block_type( __DIR__ . '/build' );

	if ( defined( 'WC_PLUGIN_FILE' ) ) {

		// Create nonce value for apiFetch.
		$nonce    = wp_create_nonce( 'wc_store_api' );
		$cart_url = wc_get_cart_url();

		// Javascript variables.
		$js_vars = array(
			'wooActive' => true,
			'nonce'     => $nonce,
			'cartUrl'   => esc_url( $cart_url ),
		);

	} else {
		$js_vars = array(
			'wooActive' => false,
		);

		/**
		 * Admin notice for missing WooCommerce plugin.
		 *
		 * @return void
		 */
		function woohotspots_admin_plugin_notice() {
			?>
			<div class="notice notice-info is-dismissible woohotspots-admin-notice">
				<div class="woohotspots-admin-notice-wrapper">
					<h2><?php esc_html_e( 'WooHotSpots Notice', 'woohotspots' ); ?></h2>
					<p><?php esc_html_e( 'WooHotSpots plugin is a block plugin for creating WooCommerce product showcases with image hotspots. To enable the WooHotSpots, please install and activate the WooCommerce plugin.', 'woohotspots' ); ?></p>
					<a target="_blank" class="button-primary button" href="<?php echo esc_url( 'https://wordpress.org/plugins/woocommerce/' ); ?>"><?php esc_html_e( 'Get WooCommerce', 'woohotspots' ); ?></a>
				</div>
			</div>
			<?php
		}
		add_action( 'admin_notices', 'woohotspots_admin_plugin_notice' );
	}

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

	wp_set_script_translations( 'micemade-woohotspots-view-script', 'woohotspots', plugin_dir_path( __FILE__ ) . 'languages/' );
	wp_set_script_translations( 'micemade-woohotspots-editor-script', 'woohotspots', plugin_dir_path( __FILE__ ) . 'languages/' );

}

add_action( 'init', 'woohotspots_block_init' );
