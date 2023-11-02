/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { SelectControl, ToggleControl, TextControl, PanelBody, PanelRow, FormTokenField, RangeControl } from '@wordpress/components';
import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
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
export default function Edit( { attributes, setAttributes } ) {
	// postCategory defined in block.json
    const { wrapperClass, postsType, postsCategory, notinCategory, postsCount, postsTag, notinTag, showImage, ignoreSticky, showExcerpt, showCategory, showDate, showButton, buttonLabel, templateFile, orderBy, sortOrder, postOffset } = attributes;
	
	// useSelect to retrieve all post types and categories
	const { useSelect } = wp.data;


	//
	// Start - Get a list of Post Types
	//
    // useSelect to retrieve all post types
    const postTypes = useSelect(
        (select) => select(coreStore).getPostTypes({ per_page: -1 }), []
    );

    // Options expects [{label: ..., value: ...}]
    var postTypeOptions = !Array.isArray(postTypes) ? postTypes : postTypes
        .filter(
            // Filter out internal WP post types eg: wp_block, wp_navigation, wp_template, wp_template_part..
            postType => postType.viewable == true)
        .map(
            // Format the options for display in the <SelectControl/>
            (postType) => ({
                label: postType.labels.singular_name,
                value: postType.slug, // the value saved as postType in attributes
            })
        );
	// End - Get a list of Post Types


	// Sort Order options
	const sortOrderOptions = [ {label:'DESC', value:"DESC"}, {label:'ASC', value:"ASC"} ];

	//
	// Populate the Categories SelectControl
	//
	const catsList = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category' );
	} )

	const defaultCatId = 0;
	let catOptions = [];
	let catsSelected = [];

	if( catsList ) {
		catsList.forEach( ( catsList ) => {
			catOptions.push( { value : catsList.id, label : catsList.name } );
			if ( { postsCategory } == catsList.id ) {
				defaultCatId = catsList.id;
			}

		})
	} else {
		catOptions.push( { value: 0, label: 'Loading...' } );
	}



	//
	// Use the FormTokenField control for relevant WP Tags
	//
	const { tags } = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' )

		return {
			tags: getEntityRecords( 'taxonomy', 'post_tag' ),
		}
	} )
		
	let options = []
	if( tags ) {
		options = tags.map( value => value.name )
	}



	//
	// Update the selected categories
	//
	const updateSelectedCategories = ( selectedId ) => {
		catsSelected = [...postsCategory];

		let foundIdx = catsSelected.indexOf( selectedId );
		if ( foundIdx > -1 ) {
			catsSelected.splice(foundIdx, 1);

		} else {
			// Add a new selected category
			catsSelected.push ( selectedId );

		}

		// Now update the postsCategory array
		setAttributes({ postsCategory: catsSelected });
	};



	//
	// Save the selected Tags
	//
	const updateSelectedTags = ( mytokens ) => {
		// Now update the poststagy array
		setAttributes({ postsTag: mytokens });
	};




	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
                <PanelBody title="Settings" initialOpen={true}>
					<PanelRow>
						<TextControl
							label="Class"
							value={ wrapperClass }
							onChange={(value) => setAttributes({ wrapperClass: value })}
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label="Post Type"
							options={ postTypeOptions }
							value={ postsType }
							onChange={(value) => setAttributes({ postsType: value })}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							multiple
							label="Post Categories"
							options={ catOptions }
							value={ postsCategory }
							onChange={(value) => updateSelectedCategories( Number.parseInt( value ) ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Exclude Categories"
							checked={ attributes.notinCategory }
							onChange={() => setAttributes({ notinCategory: !attributes.notinCategory })}
						/>
					</PanelRow>

					<PanelRow>
						<RangeControl
							label={ "Number of posts" }
							value={ postsCount }
							onChange={ ( value ) => setAttributes( { postsCount: Number.parseInt( value ) } ) }
							min={ 1 }
							max={ 12 }
						/>
					</PanelRow>

					<PanelRow>
						<FormTokenField
							label={ "Tags" }
							value={ postsTag }
							suggestions={ options }
							onChange={ ( tokens ) => updateSelectedTags( tokens )}
							
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Exclude Tags"
							checked={ attributes.notinTag }
							onChange={() => setAttributes({ notinTag: !attributes.notinTag })}
						/>
					</PanelRow>

					<PanelRow>
						<ToggleControl
							label="Show Feature Image"
							checked={ attributes.showImage }
							onChange={() => setAttributes({ showImage: !attributes.showImage })}
						/>
					</PanelRow>

					<PanelRow>
						<ToggleControl
							label="Ignore Sticky Posts"
							checked={ attributes.ignoreSticky }
							onChange={() => setAttributes({ ignoreSticky: !attributes.ignoreSticky })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show Excerpt"
							checked={ attributes.showExcerpt }
							onChange={() => setAttributes({ showExcerpt: !attributes.showExcerpt })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show Category"
							checked={ attributes.showCategory }
							onChange={() => setAttributes({ showCategory: !attributes.showCategory })}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show Date"
							checked={ attributes.showDate }
							onChange={() => setAttributes({ showDate: !attributes.showDate })}
						/>
					</PanelRow>

					<PanelRow>
						<ToggleControl
							label="Show Button"
							checked={ attributes.showButton }
							onChange={() => setAttributes({ showButton: !attributes.showButton })}
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label="Button Label"
							value={ buttonLabel }
							onChange={(value) => setAttributes({ buttonLabel: value })}
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label="Custom Template"
							value={ templateFile }
							onChange={(value) => setAttributes({ templateFile: value })}
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label="Order By"
							value={ orderBy }
							onChange={(value) => setAttributes({ orderBy: value })}
							help="eg: date, title, menu_order, rand"
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label="Sort Order"
							options={ sortOrderOptions }
							value={ sortOrder }
							onChange={(value) => setAttributes({ sortOrder: value })}
						/>
					</PanelRow>

					<PanelRow>
						<RangeControl
							label={ "Offset" }
							value={ postOffset }
							onChange={ ( value ) => setAttributes( { postOffset: Number.parseInt( value ) } ) }
							min={ 0 }
							max={ 12 }
						/>
					</PanelRow>

				</PanelBody>
            </InspectorControls>

			<ServerSideRender 
				block="ingeni/ingeni-latest-posts"
				attributes={ { wrapperClass, postsType, postsCategory, notinCategory, postsCount, postsTag, notinTag, showImage, ignoreSticky, showExcerpt, showCategory, showDate, showButton, buttonLabel, templateFile, orderBy, sortOrder, postOffset } }
			/>	
		</div>
	);
}
