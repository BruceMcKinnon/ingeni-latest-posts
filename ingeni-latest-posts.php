<?php
/**
 * Plugin Name:       Ingeni Latest Posts
 * Description:       Display the latest posts of a category
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           2023.4.0
 * Author:            Bruce McKinnon - ingeni.net
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ingeni-latest-posts
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_block_ingeni_latest_posts_block_init() {

	register_block_type( __DIR__ . '/build', array(
		'render_callback' => function( $attributes ) {

			$retHtml = '';
			$num_posts = (int) $attributes['postsCount'];
			$cat_name = "";
			$the_terms = $post_cat = array();
			$cat_id = 0;

			$debugHtml = '';

			$log_debug = (int) $attributes['logDebug'];

			if ($log_debug) {
				fb_log('attributes:'.print_r($attributes,true));
			}

			$postsType = $attributes['postsType'];
			if ( !$postsType ) {
				$postsType = 'post';
			}

			// Allows you query for posts no in the selected categories
			$not_in_tag = (int) $attributes['notinTag'];

			$query_categories = $attributes['queryCategories'];

			$ignore_sticky_posts = (int) $attributes['ignoreSticky'];
			$template_file = $attributes['templateFile'];

			$orderBy = $attributes['orderBy'];
			$sortOrder = $attributes['sortOrder'];

			$offset = $attributes['postOffset'];
			$postParent = $attributes['postParent'];

			$metaKey = $attributes['metaKey'];
			$metaValue = $attributes['metaValue'];
			$metaCompare = $attributes['metaCompare'];

			$atts = array(
				'orderby' => $orderBy,
				'order' => $sortOrder,
				'posts_per_page' => $num_posts,
				'ignore_sticky_posts' => $ignore_sticky_posts,
				'offset' => $offset,
				'post_type' => $postsType,
				'post_status' => 'publish',
				'post_parent' => $postParent,
				'post_mime_type' => '',
				'year' => '',
			);

			if ( $query_categories != 'ignore' ) {
				if ( $query_categories == 'exclude' ) {
					$atts += array('category__not_in' => $attributes['postsCategory'] );
					
				} else {
					$atts += array('category__in' => $attributes['postsCategory'] );
				}
			}

			

			// Tags - these are saved as an array of slugs. But we need to provide
			// WP_Query with the matching IDs
			$tag_id = array();
			foreach($attributes['postsTag'] as $slug) {
				
				$tag_term = get_term_by('name', $slug, 'post_tag');
				if ( $tag_term ) {
					array_push($tag_id,$tag_term->term_id);
				}
			}
			if ( $tag_id ) {
				if ( $not_in_tag ) {
					$atts += array('tag__not_in' => $tag_id );
					
				} else {
					$atts += array('tag__in' => $tag_id );
				}
			}

			// Add meta field query to the mix - great for ACF
			if (strlen($metaKey) > 0) {
				//if ( is_string($metaValue) ) {
					//$metaValue = $metaValue;
				//}
				//$metaKey = $metaKey;
				//$metaCompare = $metaCompare;

				$meta_atts = array( 'meta_key' => $metaKey, 'meta_value' => $metaValue, 'meta_compare' => $metaCompare );

				$atts += $meta_atts;
			}

			if ($log_debug) {
				fb_log('WP_Query:'.print_r($atts,true));
			}

			//
			// Use a custom template?
			//
			if ( $template_file != '' ) {

				if ( file_exists( plugin_dir_path( __FILE__ ) . 'templates/'.$template_file ) ) {
					$template_file = plugin_dir_path( __FILE__ ) . 'templates/'.$template_file;
				}

				if ( file_exists( get_template_directory() .'/ingeni-latest-posts/'.$template_file ) ) {
					$template_file = get_template_directory() .'/ingeni-latest-posts/'.$template_file;
				}

				if ( file_exists( get_stylesheet_directory() .'/ingeni-latest-posts/'.$template_file ) ) {
					$template_file = get_stylesheet_directory() .'/ingeni-latest-posts/'.$template_file;
				}
			}
			//fb_log('template_file:'.$template_file);
	
			$has_template = false;
			if ( file_exists( $template_file ) ) {
				// Custom template exists
				$has_template = true;
			} else {
				// Use the standard template
				$template_file = plugin_dir_path( __FILE__ ) . 'templates/ilp_template_std.php';
				if ( file_exists( $template_file ) ) {
					$has_template = true;
				}
			}

			$templateRenderer = null;
			if ( !$has_template ) {
				$retHtml = '<p>Sorry, there is no template available to display the latest posts!</p>';

			} else {
				// Include the template file
				include_once($template_file);
				//fb_log('using template: '.$template_file);

				// Instantiate the renderer class
				if ( class_exists("ilp_template") ) {
					$templateRenderer = new ilp_template( $attributes );

				} else {
					$retHtml = '<p>Sorry, the latest posts template '.$template_file. ' does not support the mandatory functions.</p>';
				}
			}

			if ( $templateRenderer ) {
				// Open the wrapper divs
				$retHtml = $templateRenderer->ilp_get_block_wrapper_open();

				$the_query = new WP_Query( $atts );

				if ($log_debug) {
					fb_log('sql:'.$the_query->request);
				}

				if ( $the_query->have_posts() ) {
					$post_idx = 0;

					while ( $the_query->have_posts() ) {
						$the_query->the_post();

						$post_idx += 1;
						if ( $post_idx > $atts['posts_per_page'] ) {
							break;
						}

						$retHtml .= $templateRenderer->ilp_render_one_post( get_the_ID(), $post_idx );
					}

				} else {
					$retHtml .= '<p>Sorry, no posts found!</p>';
				}

				// Close the wrapper divs
				$retHtml .= $templateRenderer->ilp_get_block_wrapper_close();
			}

		if ($log_debug) {
			fb_log('returns: '.$retHtml);
		}
		return $retHtml;
		}
	) );
}
add_action( 'init', 'create_block_ingeni_latest_posts_block_init' );
