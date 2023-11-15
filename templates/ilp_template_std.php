<?php
/*

Standard template for ingeni-latest-posts 

Templates need to implement a ilp_template() class that support the following public methods:

ilp_get_block_wrapper_open()

    ilp_render_one_post()

ilp_get_block_wrapper_close()

*/

if ( !class_exists("ilp_template") ) {
class ilp_template {
	public $html;
	public $attributes;
    public $wrapperClass, $show_image, $show_excerpt, $show_category, $show_date, $show_button, $button_label, $posts_per_page;

	function __construct( $attributes ) {

		$this->html = '';

        // Grab attributes that relate to the template
        $this->attributes = $attributes;

        $this->wrapperClass = "ingeni_latest_posts";
        if ( $attributes['wrapperClass'] != '' ) {
            $this->wrapperClass  = $attributes['wrapperClass'];
        }

		$this->posts_per_page = (int) $attributes['postsCount'];

        $this->show_image = (int) $attributes['showImage'];
		$this->show_excerpt = (int) $attributes['showExcerpt'];
		$this->show_category = (int) $attributes['showCategory'];
		$this->show_date = (int) $attributes['showDate'];
		$this->show_button = (int) $attributes['showButton'];

		$this->button_label = $attributes['buttonLabel'];
        if ($this->button_label == '') {
            $this->button_label = "Read more";
        }
    }

    function ilp_render_one_post( $post_id, $idx ) {

        $this->html = '';
		if ( has_post_thumbnail( $post_id ) && ($this->show_image) ) {
			$image_id = get_post_thumbnail_id( $post_id );
			$image_title = get_the_title( $image_id );
			$image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', TRUE);
			if ( strlen(trim($image_alt)) < 1 ) {
				$image_alt = $image_title;
			}
		
			// Get the srcset
			$size = 'large';
			$img_src = wp_get_attachment_image_url( $image_id, $size );
			$srcset = wp_get_attachment_image_srcset( $image_id , $size );
		
			$sizes = 'sizes="(max-width: 48px) 480px, (max-width: 640px) 640px, (max-width: 1200px) 1200px"';
		
			$hero_img = '<div class="img_wrap"><img src="'.$img_src.'" srcset="'.$srcset.'" '.$sizes.' loading="lazy" title="'.$image_title.'" alt="'.$image_alt.'" />';
			$hero_img .= '</div>';
		}
	
		$class_list = 'wp-block-column is-layout-flow wp-block-column-is-layout-flow';
		$this->html .= '<div class="'.$class_list.' item_wrap">';

		// Only provide a clickable link if viewing from the front-end. Block links when editing.
		$item_link = get_permalink( $post_id );
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			$item_link = '#';
		};
	
		$this->html .= '<a href="' . $item_link . '" title="' . wp_strip_all_tags( get_the_title( $post_id ) ) . '" >';
			if ($this->show_image) {
				$this->html .= $hero_img;
			}
	
			if ($this->show_category) {
				$cat_name = '';
				$all_terms = get_the_terms( $post_id, 'category' );
				if ($all_terms) {
					foreach($all_terms as $the_term) {
						$cat_name .= $the_term->name . ', ';
					}
				}
				if ( substr($cat_name, strlen($cat_name)-2, 2) == ', ' ) {
					$cat_name = substr($cat_name, 0, strlen($cat_name)-2);
				}
	
				$this->html .= '<p class="item_category">' . $cat_name . '</p>';
			}
	
			$this->html .= '<h3 class="item_title">' . wp_strip_all_tags( get_the_title( $post_id ) ) . '</h3>';
		$this->html .= '</a>';
	
		if ($this->show_date) {
			$sys_date_format = get_option( 'date_format' ); // e.g. "F j, Y"
			$sys_date_format .= ' ' . get_option( 'time_format' ); // e.g. "H:i:s"

			$this->html .= '<p class="item_date">' . get_the_date($sys_date_format,  $post_id ) . '</p>';
		}
	
		if ($this->show_excerpt) {
			if ( function_exists("short_excerpt") ) {
				$excerpt = short_excerpt( get_the_content( null, false,  $post_id ), 80 );
			} else {
				$excerpt = get_the_excerpt(  $post_id );
			}
			$this->html .= '<p class="item_excerpt">' . wp_strip_all_tags( $excerpt ) . '</p>';
		}
		if ($this->show_button) {
			$this->html .= '<a class="item_button button wp-block-button__link wp-element-button" href="' . $item_link . '">' . $this->button_label . '</a>';
		}
	
		$this->html .= '</div>';

		return $this->html;
	}
	

    function ilp_get_block_wrapper_open() {
        return ( '<div class="'.$this->wrapperClass.'"><div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">' );
    }
	
    function ilp_get_block_wrapper_close() {
        return ( '</div></div>' );
    }



    //
    // Add additional supporting function here....
    //

	private function get_first_sentence($content, $min_character_count = 0, $max_character_count = 150, $num_sentances = 1) {
		$retVal = $content;

		// Remove H4s
		$clean = preg_replace('#<h4>(.*?)</h4>#', '', $content);
		$clean = wp_strip_all_tags($clean);
		// Replace all curly quotes.
		$clean = str_replace(array('“','”'), '"', $clean);

		$locs = get_sentance_endings($clean, $min_character_count);
		$loc = $locs[0];

	
		$retVal = substr($clean,0, ($loc+1) );

		if ($num_sentances == 2) {
			$clean = substr( $clean, ($loc+1), (strlen($clean)-($loc+1)) );

			$locs = get_sentance_endings($clean, $min_character_count);
			$loc = $locs[0];
			$retVal .= substr($clean,0, ($loc+1) );
		}

		if (strlen($retVal) > $max_character_count) {
			$retVal = substr($retVal,0,$max_character_count+10);
			$last_word = strripos($retVal,' ');
			if ($last_word !== false) {
				$retVal = substr($retVal,0,$last_word) . '...';
			}
		}

		return $retVal;
	}

	private function get_sentance_endings( $clean, $min_character_count ) {
		$exclaim = strpos($clean, "!",$min_character_count);
		if ($exclaim === false) {
			$exclaim = strlen($clean)-1;
		}
		$question = strpos($clean, "?",$min_character_count);
		if ($question === false) {
			$question = strlen($clean)-1;
		}
		$endquote = strpos($clean, '".',$min_character_count);
		if ($endquote === false) {
			$endquote = strlen($clean)-1;
		}
		$period = strpos($clean, '.',$min_character_count);
		if ($period === false) {
			$period = strlen($clean)-1;
		}

		$locs = array($exclaim,$question,$endquote,$period);
		sort( $locs );

		return $locs;
	}

	private function short_excerpt( $content, $limit_chars = 100 ) {
		if ( function_exists("get_first_sentence") ) {
			$excerpt = get_first_sentence($content);
		} else {
			$excerpt = trim(substr($content,$limit_chars));

			if ( substr($excerpt,strlen($excerpt)-1,1) != '.' ) {
				$excerpt += '...';
			}
		}
		return $excerpt;
	}

}
}