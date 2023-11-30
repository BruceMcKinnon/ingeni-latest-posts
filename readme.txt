=== Ingeni Latest Posts ===
Contributors:      The WordPress Contributors
Tags:              block, posts
Tested up to:      6.3.1
Stable tag:        2023.5.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display the latest posts of a category

== Description ==

A block control to display the latest posts or page. Posts are displayed in columns, but a custom template can be provided to display the posts in any required format.


== Installation ==

1. Upload the plugin files to the '/wp-content/plugins/ingeni-latest-posts' directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= How do I create a custom template =

1. In your Wordpress theme folder, create a sub-folder called 'ingeni-latest-posts'.
2. Copy the file '/wp-content/plugins/ingeni-latest-posts/templates/ilp_template_std.php' to '/wp-content/{your_theme}/ingeni-latest-posts/ilp_template_std.php'.
3. In the '/wp-content/{your_theme}/ingeni-latest-posts/ilp_template_std.php' folder, rename the file 'ilp_template_std.php' (make sure you keep the .php file extension).



== Changelog ==

= 2023.1.0  - Initial release.

= 2023.2.0  - Added the ability to set the sortOrder and orderBy parameters of the WP query, and also the offset parameter.

= 2023.3.0  - Added the Post Parent ID parameter.

= 2023.4.0  - Refactored the Categories - now permits selected categories to included, excluded, or completely ignored.
            - Added debug switch
            - Added meta query builder (specifically for ACF and CPTs).

= 2023.5.0  - If Max Posts set to 0, display all posts
            - If Post Parent set to 0, ignore checking the Post Parent
