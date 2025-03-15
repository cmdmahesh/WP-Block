Here’s a custom WordPress block implementation using `@wordpress/scripts`, `@wordpress/block-editor`, and `@wordpress/components` for two blocks:

Testimonial Block – Allows users to enter testimonials in the editor and displays them on the front end.
Image Gallery Block – Lets users select multiple images in the editor and displays them as a simple slider without additional libraries.

## Steps to Implement: ##

- Place this code inside your _s theme under wp-content/themes/your-theme/blocks/.
- Create two subdirectories: testimonial and gallery-slider.
- Add respective index.js and edit.js files for each block.
- Register them in functions.php.

# Step 1: Prepare the Theme for Custom Blocks #
- Navigate to your _s theme folder:
`cd wp-content/themes/your-theme`
- Create a blocks directory:
`mkdir blocks`
`cd blocks`
- Inside blocks, create subdirectories for both blocks:
`mkdir testimonial gallery-slider`

# Step 2: Install Necessary Dependencies #

Since we're building the blocks using modern JavaScript, we need Node.js and npm.

Inside your theme folder, initialize a new Node.js project:

`npm init -y`

Install the required WordPress scripts:

`npm install @wordpress/scripts @wordpress/blocks @wordpress/block-editor @wordpress/components @wordpress/i18n @wordpress/element --save-dev`

Open package.json and add this script:

```
"scripts": {
    "build": "wp-scripts build ./index.js --output-path=build",
    "start": "wp-scripts start ./index.js --output-path=build"
  }
```

# Step 3: Create index.js for Each Block #

Now, let's define our blocks.

Testimonial Block (blocks/testimonial/index.js)

Gallery Slider Block (blocks/gallery-slider/index.js)

# Step 4: Bundle JavaScript Files #

Now, in the blocks directory, create a new index.js file to import both blocks

Then, build the files: `npm run build`

# Step 5: Register Blocks in functions.php #
```
function custom_blocks_init() {
    $script_path = get_template_directory() . '/blocks/build/index.js';
    $asset_file = include(get_template_directory() . '/blocks/build/index.asset.php');

    wp_register_script(
        'custom-blocks-js',
        get_template_directory_uri() . '/blocks/build/index.js',
        $asset_file['dependencies'], // Automatically loads required WP scripts
        $asset_file['version'],      // Ensures cache busting
        true
    );

    register_block_type('custom/testimonial', [
        'editor_script' => 'custom-blocks-js',
    ]);

    register_block_type('custom/gallery-slider', [
        'editor_script' => 'custom-blocks-js',
    ]);
}
add_action('init', 'custom_blocks_init');
```

# Step 6: Add Basic Frontend Styles to style.css #
```
.custom-gallery-slider {
    display: flex;
    overflow: hidden;
    width: 100%;
    position: relative;
}

.custom-gallery-slider img {
    width: 100%;
    flex-shrink: 0;
    transition: transform 0.5s ease-in-out;
}

```
# Step 7: Add Simple JavaScript for Gallery Slider #
```
function custom_gallery_slider_script() {
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            let galleries = document.querySelectorAll('.custom-gallery-slider');
            galleries.forEach(gallery => {
                let images = gallery.querySelectorAll('img');
                let index = 0;
                
                function slide() {
                    images.forEach(img => img.style.transform = `translateX(-${index * 100}%)`);
                    index = (index + 1) % images.length;
                }
                
                setInterval(slide, 3000);
            });
        });
    </script>
    <?php
}
add_action('wp_footer', 'custom_gallery_slider_script');
```

