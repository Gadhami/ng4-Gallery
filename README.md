**`NB. Although functional, please note that this is an alpha / pre-beta release - Do NOT use in production`**

---

# ng4-Gallery
Angular 4+ Gallery (Flickr-like image grid + Slideshow)

# Features
*   Simple but fairly functional gallery based on Angular 4 (should work just fine if you use Angular 2)

*   Includes a flickr-like image/video grid

*   Integrate nicely with PhotoSwipe to open full slideshow

# Notes:

*   No tests has been made on angular 2+ project, but instructions should be the same

*   If you have any question, consult the demo project or open an issue

*   To make things simple (for both me and potential developers / users), this package relies on PhotoSwipe to use the slideshow


# How to use:

1.   Create a new angular 2+ project. If you are using Angular CLI, just run this command in command line:

            ng new YOUR_PROJECT_NAME

2.  Install PhotoSwipe via NPM by running this command:

            npm install ng4-gallery

3.  To initialize an image grid / gallery, simply add the component tag, ie.

    ```html
    <app-gallery></app-gallery>
    ```

4.  To open slideshow, simply add the component tag, ie.

    ```html
    <app-slideshow></app-slideshow>
    ```

5.  Include PhotoSwipe css and js files via CDN:

    ```html
        <!-- PhotoSwipe -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/photoswipe.min.css" />
        <!-- Skin CSS file (styling of UI - buttons, caption, etc.)
        In the folder of skin CSS file there are also:
        - .png and .svg icons sprite,
        - preloader.gif (for browsers that do not support CSS animations) -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/default-skin/default-skin.css" />

        <!-- photoswipe - Core JS file -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/photoswipe.min.js"></script>

        <!-- photoswipe - UI JS file -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/photoswipe-ui-default.min.js"></script>
    ```

That's all!
Cheers!