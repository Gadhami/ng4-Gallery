import { Component, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { Subject as Subject$1 } from 'rxjs/Subject';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { CommonModule } from '@angular/common';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
var NotificationService = (function () {
    function NotificationService() {
        this.slideshowOpenedSource = new Subject$1();
        this.moreItemsRequestedSource = new Subject$1();
        this.favoriteToggledSource = new Subject$1();
        // Observable string streams
        this.slideShowOpened$ = this.slideshowOpenedSource.asObservable();
        this.moreItemsRequested$ = this.moreItemsRequestedSource.asObservable();
        this.favoriteChanged$ = this.favoriteToggledSource.asObservable();
    }
    /**
     * @param {?} id
     * @return {?}
     */
    NotificationService.prototype.openSlideShow = function (id) { this.slideshowOpenedSource.next(id); };
    /**
     * @return {?}
     */
    NotificationService.prototype.loadMoreItems = function () { this.moreItemsRequestedSource.next(); };
    /**
     * @param {?} id
     * @return {?}
     */
    NotificationService.prototype.toggleFavorite = function (id) { this.moreItemsRequestedSource.next(id); };
    return NotificationService;
}());
NotificationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NotificationService.ctorParameters = function () { return []; };
// (Singleton) Notification service used to alert other components of changes & act upon it
var GalleryItemComponent = (function () {
    /**
     * @param {?} notif
     */
    function GalleryItemComponent(notif) {
        this.notif = notif;
        // If isSideBar = true, re-arrange UI to show 1 item per column
        this.isSideBar = false;
        this.item = {
            id: '',
            description: '',
            name: '',
            ratings: [],
            url: '',
            tags: [],
            type: 'image',
            showHeart: true,
        };
        this.isLoading = false;
    }
    /**
     * @return {?}
     */
    GalleryItemComponent.prototype.ngOnInit = function () {
        // Define default dropdown menu items
        if (!this.item.menu) {
            this.item.menu = [
                { name: 'Github Repo', url: '#', isSeparator: false },
                { name: 'Website', url: '#', isSeparator: false },
                { name: '', url: '#', isSeparator: true },
                { name: 'More...', url: '#', isSeparator: false },
            ];
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GalleryItemComponent.prototype.openGallery = function (e) {
        console.log('openGallery()');
        e.preventDefault();
        this.notif.openSlideShow(this.item.id);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GalleryItemComponent.prototype.toggleFavorite = function (e) {
        e.preventDefault();
        this.notif.toggleFavorite(this.item.id);
    };
    return GalleryItemComponent;
}());
// =========================================================================
GalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-gallery-item',
                template: "\n      <div class=\"item no-padding no-gutters col-lg-3 col-md-6 col-sm-12 col-xs-12\" [ngClass]=\"{ 'auto-width' : isSideBar }\">\n\n          <!-- Item Name -->\n          <h4 class=\"name float-left\">\n              <a href=\"#\" (click)=\"openGallery($event)\">    <!-- [routerLink]=\"['/items', item?.id]\"> -->\n                  {{item?.name}}\n              </a>\n          </h4>\n\n          <!-- More (...) -->\n          <div id=\"more\" *ngIf=\"item?.menu\">\n              <div class=\"float-right more-dot\">\n                  <a href=\"#\">\n                      <!-- <i class=\"fa fa-ellipsis-h\" aria-hidden=\"true\" title=\"More info about {{item?.name}}\"></i> -->\n                      <img src=\"assets/images/if_more-horiz_326673.svg\" aria-hidden=\"true\" title=\"More info about {{item?.name}}\" />\n                  </a>\n              </div>\n\n              <!-- Dropdown Menu -->\n              <div class=\"clearfix\"></div>\n              <div class=\"dropdown\">\n                  <ul>\n                      <li *ngFor=\"let menuItem of item?.menu\" [ngClass]=\"{ 'separator' : menuItem.isSeparator }\">\n                          <a [href]=\"menuItem.url\" *ngIf=\"!menuItem.isSeparator\">{{menuItem.name}}</a>\n                          <hr *ngIf=\"menuItem.isSeparator\" />\n                      </li>\n                  </ul>\n              </div>\n          </div>\n\n          <!-- Items / Image / Video Player / ... -->\n          <span [title]=\"item?.description\" [ngSwitch]=\"item?.type\">\n              <!-- Video Player -->\n              <vg-player *ngSwitchCase=\"'video'\">\n                  <vg-overlay-play></vg-overlay-play>\n                  <vg-buffering></vg-buffering>\n\n                  <vg-scrub-bar *ngIf=\"!isSideBar\">\n                      <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n                      <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\n                  </vg-scrub-bar>\n\n                  <vg-controls>\n                      <vg-play-pause></vg-play-pause>\n                      <vg-playback-button *ngIf=\"!isSideBar\"></vg-playback-button>\n\n                      <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\" *ngIf=\"!isSideBar\"></vg-time-display>\n\n                      <vg-scrub-bar style=\"pointer-events: none;\"></vg-scrub-bar>\n\n                      <vg-time-display vgProperty=\"left\" vgFormat=\"mm:ss\" *ngIf=\"!isSideBar\"></vg-time-display>\n                      <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\n\n                      <!-- <vg-track-selector *ngIf=\"!isSideBar\"></vg-track-selector> -->\n                      <vg-mute></vg-mute>\n                      <vg-volume *ngIf=\"!isSideBar\"></vg-volume>\n\n                      <vg-fullscreen></vg-fullscreen>\n                  </vg-controls>\n\n                  <video crossorigin=\"anonymous\" [vgMedia]=\"media\" #media preload=\"none\" class=\"player\" preload=\"metadata\">\n                      <source [src]=\"item?.url\" type=\"item/mp4\">\n\n                          <!-- <track kind=\"subtitles\" label=\"English\" src=\"http://static.itemgular.com/assets/subs/pale-blue-dot.vtt\" srclang=\"en\" default> -->\n\n                          Sorry, your browser doesn't support embedded items\n                  </video>\n              </vg-player>\n\n              <!-- Image -->\n              <img class=\"player\" [src]=\"item?.thumbUrl\" [title]=\"item?.description\" *ngSwitchCase=\"'image'\" (click)=\"openGallery($event)\" />\n          </span>\n\n          <!-- Item Ratings -->\n          <!-- <a href=\"#\" *ngIf=\"item?.ratings\" class=\"rating pull-right\" [title]=\"avgRating | number:'1.0-1'\" alt=\"Rate this item\">\n              <img *ngFor=\"let img of [0,1,2,3,4]\" class=\"favorite\" src=\"assets/images/favorite.png\" (click)=\"rateVideo($event)\" [attr.data-id]=\"img + 1\"\n                  [ngClass]=\"{ 'vivid': intRating >= img + 1 }\" />\n          </a> -->\n\n          <a href=\"#\" (click)=\"toggleFavorite($event)\" class=\"fav float-right\" *ngIf=\"item?.showHeart\">\n              <i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>\n          </a>\n\n          <!-- Item Description -->\n          <div class=\"description\">\n              <p>\n                  <span class=\"capitalize\">{{item?.description}}</span>       <!-- | limitDescr -->\n                  <span *ngIf=\"item?.description.length > 200\">\n                      <!-- &nbsp; <a [routerLink]=\"['/items', item?.id]\" class=\"more\" [title]=\"item?.description\">(More)</a> -->\n                  </span>\n              </p>\n          </div>\n\n          <!-- Tags -->\n          <div class=\"tags\" *ngIf=\"item?.tags\">\n              <a href=\"#\" *ngFor=\"let tag of item?.tags\" class=\"tag\">\n                  {{tag}}\n              </a>\n          </div>\n\n      </div>\n    ",
                styles: ["\n      /* Item \"Box\" */\n      .item\n      {\n          font-family: 'Droid Sans';\n          font-size: 1em;\n          background: white;\n\n          /* Put some space between items */\n          margin: 6px 6px;\n          padding: 10px;\n\n          /* Add a nice/soft shadow & border around item boxes */\n          -webkit-box-shadow: 0px 0px 8px 1px rgba(235,240,245,1);\n                  box-shadow: 0px 0px 8px 1px rgba(235,240,245,1);\n          border: 1px rgba(235,240,245,1) solid;\n\n          /* Grid-like display: */\n          display: inline-block;\n          width: calc(25% - 16px);\n      }\n\n      .item.no-padding\n      {\n          padding: 0;\n      }\n\n      /* bootstrap col*-* didn't work that well, and because of the time constraints, I used @media queries */\n      @media screen and (max-width: 750px) {\n          .item { width: calc(100% - 16px); max-width: 100%; }  /* 99% */\n      }\n      @media screen and (max-width: 1000px) and (min-width: 751px) {\n          .item { width: calc(50% - 16px); max-width: 50%; }  /* 49% */\n      }\n      @media screen and (max-width: 1200px) and (min-width: 1001px) {\n          .item { width: calc(33% - 16px); max-width: 34%; }  /* 32% */\n      }\n\n      @media screen and (max-width: 1000px)\n      {\n          /* Remove padding on small devices */\n          .item { padding: 0; }\n\n          /* Adjust ratings icons position */\n          .item a.rating { right: 5px; }\n      }\n\n      /* Adjust item player/image dimensions */\n      .item .player\n      {\n          width: 100%;\n          height: 300px;\n          cursor: pointer;\n      }\n\n      .name\n      {\n          line-height: 70px;\n          text-indent: 7px;\n      }\n\n      /* More ... */\n      .more-dot\n      {\n          height: 60px;\n      }\n      .more-dot a\n      {\n          display: -webkit-inline-box;\n          display: -ms-inline-flexbox;\n          display: inline-flex;\n          height: 70px;\n      }\n      .more-dot img\n      {\n          padding-right: 10px;\n          opacity: 0.4;\n      }\n      .more-dot img:hover {\n          opacity: 1;\n      }\n\n      /* Rating icon */\n      img.favorite\n      {\n          opacity: 0.5;\n      }\n\n      .item a.rating\n      {\n          top: 20px;\n          position: relative;\n      }\n\n      /* Change favorite image opacity if user hover it */\n      img:hover.favorite, img.vivid\n      {\n          opacity: 1;\n      }\n\n      /* Item Name */\n      h4\n      {\n          height: 60px;\n          line-height: 25px;\n          text-overflow: ellipsis;\n          overflow: hidden;\n      }\n\n          h4 a\n          {\n              text-decoration: none;\n              color: blue;\n              border-bottom: 1px solid rgba(39, 109, 170, 0.5);\n          }\n\n          h4 a:hover\n          {\n              border-bottom: 2px solid;\n          }\n\n      /* Item Description */\n      .description p\n      {\n          height: 100px;\n          overflow: hidden;\n          padding: 10px;\n      }\n\n      /* Set width to auto if we're loading item as a sidebar (if item details) */\n      .auto-width\n      {\n          width: auto;\n      }\n\n      .more\n      {\n          color: blue;\n          text-decoration: underline;\n      }\n\n      /* Item Tag */\n      div.tags\n      {\n          margin: 5px;\n      }\n      a.tag\n      {\n          display: inline-block;\n          padding: 5px;\n          background: #f8f9fa;\n          color: rgba(73, 80, 87, 0.7);\n          margin-right: 7px;\n          border-bottom: 2px solid hsl(0, 0%, 80%);\n          font-size: 0.9em;\n\n          background: aliceblue;\n          border-bottom: 2px solid #007bff;\n          color: #007bff;\n      }\n      a.tag:hover\n      {\n          text-decoration: none;\n          /* color: #495057; */\n\n          background: hsla(208, 100%, 94%, 1);\n          border-bottom: 2px solid #007bff;\n          color: #007bff;\n      }\n\n      /* Dropdown Menu */\n      .dropdown\n      {\n          position: absolute;\n          display: none;\n          margin: 0;\n          width: 50%;\n          padding: 0;\n          right: 0;\n      }\n      .dropdown ul\n      {\n          background: white;\n          -webkit-box-shadow: 0px 0px 12px 1px rgba(235,240,245,0.5);\n                  box-shadow: 0px 0px 12px 1px rgba(235,240,245,0.5);\n          border: 1px rgba(235,240,245,1);\n          width: 100%;\n          list-style: none;\n          padding: 0;\n          font-size: 0.9em;\n\n          /* Top Border (works with) */\n          border-top: 1px solid rgba(0, 0, 0, 0.1);\n      }\n\n      /* Dropdown arrow */\n      .dropdown:before\n      {\n          position: absolute;\n          top: -7px;\n          display: inline-block;\n          border-right: 7px solid transparent;\n          border-bottom: 7px solid rgba(235, 240, 245, 0.5);\n          border-left: 7px solid transparent;\n          border-bottom-color: rgba(0, 0, 0, 0.1);\n          content: '';\n          right: 10px;\n      }\n  \n      .dropdown:after\n      {\n          position: absolute;\n          top: -6px;\n          display: inline-block;\n          border-right: 6px solid transparent;\n          border-bottom: 7px solid #ffffff;\n          border-left: 6px solid transparent;\n          content: '';\n          right: 11px;\n      }\n\n      .more-dot:hover ~ .dropdown, .dropdown:hover\n      {\n          display: block;\n      }\n\n      .dropdown li\n      {\n          cursor: pointer;\n          line-height: 35px;\n          padding-left: 10px;\n      }\n      /* .dropdown li:hover\n      {\n          background: aliceblue;\n      } */\n\n      li.separator\n      {\n          line-height: 1px;\n          height: 1px;\n      }\n      li.separator hr\n      {\n          border-top-color: aliceblue;\n          margin-top: 0;\n      }\n      .dropdown li a\n      {\n          color: black;\n      }\n      .dropdown li:hover a\n      {\n          text-decoration: underline;\n          color: blue;\n      }\n\n      /* Favorite Icon */\n      a.fav.float-right\n      {\n          padding: 9px;\n          font-size: 1.25em;\n          position: absolute;\n          bottom: 0;\n          right: 5px;\n          color: deeppink;\n          color: darkorchid;\n          color: crimson;\n          color: dodgerblue;\n          color: lightsteelblue;\n          color: wheat;\n      }\n\n      /* Capitalize description */\n      .capitalize\n      {\n          text-transform: capitalize;\n      }\n    "]
            },] },
];
/**
 * @nocollapse
 */
GalleryItemComponent.ctorParameters = function () { return [
    { type: NotificationService, },
]; };
GalleryItemComponent.propDecorators = {
    'isSideBar': [{ type: Input },],
    'item': [{ type: Input },],
};
// (Singleton) Notification service used to alert other components of changes & act upon it
var GalleryComponent = (function () {
    /**
     * @param {?} notif
     */
    function GalleryComponent(notif) {
        this.notif = notif;
        // Set "isLoadingGallerys" to True if we're already loading videos (to avoid
        // sending multiple requests in case user keeps scrolling)
        this.isLoadingGallery = false;
        this.error = '';
        this.galleryItems = [];
        // True => user is loading index page   |   False => user is viewing gallery item details page
        this.isSideBar = false;
        this.galleryDescr = '';
        // Only valid if video is loading as a side bar, store the main video's ID
        // Variable used to skip loading the same video both as main one and on the side bar!
        this.mainGalleryId = '';
        // Disable items auto-loading after 5 times
        this.disableLoadMoreAfter = 5;
        this.autoLoadCounter = 0;
    }
    /**
     * @return {?}
     */
    GalleryComponent.prototype.ngOnInit = function () {
        // Infinite scrolling implemented in home page only
        // (doesn't make sense to add it in sidebar...)
        if (!this.isSideBar) {
            // AFAIA, we can't use conditional listening, ie. combine HostListener() & if(isSideBar),
            // so we have to use the "classic" approach, ie. call addEventListener()
            var /** @type {?} */ that_1 = this;
            document.addEventListener('scroll', function () {
                that_1.userScrolling();
            }, true);
        }
    };
    /**
     * @return {?}
     */
    GalleryComponent.prototype.userScrolling = function () {
        // User is scrolling page, load more items if s/he reached bottom:
        if (this.isInViewport(this.scrollMoreDiv.nativeElement)) {
            // load more items
            this.loadMoreItems();
        }
    };
    /**
     * @return {?}
     */
    GalleryComponent.prototype.loadMoreItems = function () {
        if (this.autoLoadCounter <= this.disableLoadMoreAfter) {
            console.log('loadMoreItems()');
            this.autoLoadCounter++;
            this.notif.loadMoreItems();
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    GalleryComponent.prototype.isInViewport = function (el) {
        // (Helper function) Return true if element is in viesport (ie. visible!)
        var /** @type {?} */ rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    };
    return GalleryComponent;
}());
// =========================================================================
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-gallery',
                template: "\n      <!-- Welcome Message -->\n      <header *ngIf=\"!isSideBar\">\n          <p>{{galleryDescr}}</p>\n      </header>\n\n      <section>\n          <!-- for loop to display (up to 10) gallery items -->\n          <app-gallery-item\n              *ngFor=\"let item of galleryItems\"\n                  [item]=\"item\"\n                  [isSideBar]=\"isSideBar\">\n          </app-gallery-item>\n\n          <!-- <hr /> -->\n          <div class=\"row text-center\" id=\"loading\" *ngIf=\"!isSideBar\">\n              <!-- <img src=\"assets/images/loading.gif\" title=\"Loading more awesome entries...\" /> &nbsp;&nbsp; -->\n\n              <button (click)=\"loadMoreItems()\" class=\"btn blue center\">\n                  Loading more awesome entries...\n              </button>\n          </div>\n\n          <div #scrollMore *ngIf=\"!isSideBar\">&nbsp;</div>\n      </section>\n\n      <br /><br />\n    ",
                styles: ["\n      /* ========== Grid \"Container\" */\n      section\n      {\n          overflow-x: hidden;\n      }\n\n      /* ========== Fix a small position anomaly with large width */\n      @media screen and (min-width: 1000px)\n      {\n          section { padding-left: 10px; }\n      }\n\n      /* ========== Button */\n      .btn\n      {\n          border-radius: 0;    \n      }\n      .btn.blue\n      {\n          background: #207bca;\n          -webkit-box-shadow: 0 0 8px 1px hsla(208, 100%, 93%, 1);\n                  box-shadow: 0 0 8px 1px hsla(208, 100%, 93%, 1);\n          /* border: 1px solid hsla(208, 100%, 94%, 1); */\n          color: aliceblue;\n      }\n\n      /* ========== \"Loading more items...\" */\n      #loading\n      {\n          font-weight: bold;\n          margin-top: 15px;\n      }\n      #loading button\n      {\n          margin: 0 auto;\n          cursor: pointer;\n      }\n\n      /* ========== Indent Welcome/Greeting Header */\n      header\n      {\n          text-indent: 7px;\n      }\n    "]
            },] },
];
/**
 * @nocollapse
 */
GalleryComponent.ctorParameters = function () { return [
    { type: NotificationService, },
]; };
GalleryComponent.propDecorators = {
    'galleryItems': [{ type: Input },],
    'isSideBar': [{ type: Input },],
    'galleryDescr': [{ type: Input },],
    'mainGalleryId': [{ type: Input },],
    'disableLoadMoreAfter': [{ type: Input },],
    'scrollMoreDiv': [{ type: ViewChild, args: ['scrollMore',] },],
};
// Import PhotoSwipe
var SlideShowComponent = (function () {
    function SlideShowComponent() {
        this.images = [];
    }
    /**
     * @param {?=} images
     * @return {?}
     */
    SlideShowComponent.prototype.openSlideshow = function (images) {
        // Build slideshow images array
        images = images || this.images;
        // define options (if needed)
        var /** @type {?} */ options = {
            // optionName: 'option value'
            // for example:
            index: 0 // start at first slide
        };
        // Initializes and opens PhotoSwipe
        var /** @type {?} */ slideShow = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        slideShow.init();
    };
    return SlideShowComponent;
}());
// ========================================================================
SlideShowComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-slideshow',
                template: "\n      <!-- Root element of PhotoSwipe. Must have class pswp. -->\n      <div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" #slideShow>\n\n          <!-- Background of PhotoSwipe. \n                      It's a separate element as animating opacity is faster than rgba(). -->\n          <div class=\"pswp__bg\"></div>\n\n          <!-- Slides wrapper with overflow:hidden. -->\n          <div class=\"pswp__scroll-wrap\">\n\n              <!-- Container that holds slides. \n                      PhotoSwipe keeps only 3 of them in the DOM to save memory.\n                      Don't modify these 3 pswp__item elements, data is added later on. -->\n              <div class=\"pswp__container\">\n                  <div class=\"pswp__item\"></div>\n                  <div class=\"pswp__item\"></div>\n                  <div class=\"pswp__item\"></div>\n              </div>\n\n              <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n              <div class=\"pswp__ui pswp__ui--hidden\">\n\n                  <div class=\"pswp__top-bar\">\n\n                      <!--  Controls are self-explanatory. Order can be changed. -->\n\n                      <div class=\"pswp__counter\"></div>\n\n                      <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n                      <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\n                      <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n                      <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n                      <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n                      <!-- element will get class pswp__preloader--active when preloader is running -->\n                      <div class=\"pswp__preloader\">\n                          <div class=\"pswp__preloader__icn\">\n                              <div class=\"pswp__preloader__cut\">\n                                  <div class=\"pswp__preloader__donut\"></div>\n                              </div>\n                          </div>\n                      </div>\n                  </div>\n\n                  <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n                      <div class=\"pswp__share-tooltip\"></div>\n                  </div>\n\n                  <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\"></button>\n                  <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\"></button>\n\n                  <div class=\"pswp__caption\">\n                      <div class=\"pswp__caption__center\"></div>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
                styles: ["\n      .pswp__bg\n      {\n          background: rgba(0, 0, 0, 0.9);\n      }\n    "]
            },] },
];
/**
 * @nocollapse
 */
SlideShowComponent.ctorParameters = function () { return []; };
SlideShowComponent.propDecorators = {
    'photoSwipe': [{ type: ViewChild, args: ['slideShow',] },],
    'images': [{ type: Input },],
};
// Singleton Services
// Video (videogular2) modules
var GalleryModule = (function () {
    function GalleryModule() {
    }
    /**
     * @return {?}
     */
    GalleryModule.forRoot = function () {
        return {
            ngModule: GalleryModule,
            providers: [
                NotificationService
            ]
        };
    };
    return GalleryModule;
}());
GalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    // Video / videogular2 modules
                    VgCoreModule,
                    VgControlsModule,
                    VgOverlayPlayModule,
                    VgBufferingModule,
                ],
                declarations: [
                    SlideShowComponent,
                    GalleryComponent,
                    GalleryItemComponent,
                ],
                exports: [
                    SlideShowComponent,
                    GalleryComponent,
                    GalleryItemComponent,
                ]
            },] },
];
/**
 * @nocollapse
 */
GalleryModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NotificationService, GalleryItemComponent, GalleryComponent, SlideShowComponent, GalleryModule };
//# sourceMappingURL=ng4-gallery.es5.js.map
