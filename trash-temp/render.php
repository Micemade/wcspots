<?php
/**
 * Server component render callback code.
 *
 * @package WordPress
 * @subpackage Woo Lookblock
 * @since 1.0.0
 */

?>
<section <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php

	if ( isset( $attributes['productList'] ) ) {
		echo '<div class="selected-products">';// Selected products.

		foreach ( $attributes['productList'] as $product_id ) {
			// WC get product object.
			$product = wc_get_product( $product_id );

			if ( ! is_wp_error( $product ) ) {
				echo '<div class="product">';// Start product.
				echo '<h4><a href="' . esc_url( $product->get_permalink() ) . '">' . esc_html( $product->get_name() ) . '</a></h4>';
				echo wp_kses_post( $product->get_image() );
				echo wp_kses_post( $product->get_price_html() );
				echo wp_kses_post( '<a class="button add_to_cart_button" href="' . esc_url( $product->add_to_cart_url() ) . '">' . $product->add_to_cart_text() . '</a>' );
				echo '</div>';// End product.
			}
		}
		echo '</div>';// End Selected products.
	}
	?>
</section>
