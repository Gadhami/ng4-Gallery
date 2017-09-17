import { Component, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { Subject as Subject$1 } from 'rxjs/Subject';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { CommonModule } from '@angular/common';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

class NotificationService {
    constructor() {
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
    openSlideShow(id) { this.slideshowOpenedSource.next(id); }
    /**
     * @return {?}
     */
    loadMoreItems() { this.moreItemsRequestedSource.next(); }
    /**
     * @param {?} id
     * @return {?}
     */
    toggleFavorite(id) { this.moreItemsRequestedSource.next(id); }
}
NotificationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NotificationService.ctorParameters = () => [];

// (Singleton) Notification service used to alert other components of changes & act upon it
class GalleryItemComponent {
    /**
     * @param {?} notif
     */
    constructor(notif) {
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
    ngOnInit() {
        // Define default dropdown menu items
        if (!this.item.menu) {
            this.item.menu = [
                { name: 'Github Repo', url: '#', isSeparator: false },
                { name: 'Website', url: '#', isSeparator: false },
                { name: '', url: '#', isSeparator: true },
                { name: 'More...', url: '#', isSeparator: false },
            ];
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    openGallery(e) {
        console.log('openGallery()');
        e.preventDefault();
        this.notif.openSlideShow(this.item.id);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    toggleFavorite(e) {
        e.preventDefault();
        this.notif.toggleFavorite(this.item.id);
    }
}
// =========================================================================
GalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-gallery-item',
                template: `
      <div class="item no-padding no-gutters col-lg-3 col-md-6 col-sm-12 col-xs-12" [ngClass]="{ 'auto-width' : isSideBar }">

          <!-- Item Name -->
          <h4 class="name float-left">
              <a href="#" (click)="openGallery($event)">    <!-- [routerLink]="['/items', item?.id]"> -->
                  {{item?.name}}
              </a>
          </h4>

          <!-- More (...) -->
          <div id="more" *ngIf="item?.menu">
              <div class="float-right more-dot">
                  <a href="#">
                      <!-- <i class="fa fa-ellipsis-h" aria-hidden="true" title="More info about {{item?.name}}"></i> -->
                      <img src="assets/images/if_more-horiz_326673.svg" aria-hidden="true" title="More info about {{item?.name}}" />
                  </a>
              </div>

              <!-- Dropdown Menu -->
              <div class="clearfix"></div>
              <div class="dropdown">
                  <ul>
                      <li *ngFor="let menuItem of item?.menu" [ngClass]="{ 'separator' : menuItem.isSeparator }">
                          <a [href]="menuItem.url" *ngIf="!menuItem.isSeparator">{{menuItem.name}}</a>
                          <hr *ngIf="menuItem.isSeparator" />
                      </li>
                  </ul>
              </div>
          </div>

          <!-- Items / Image / Video Player / ... -->
          <span [title]="item?.description" [ngSwitch]="item?.type">
              <!-- Video Player -->
              <vg-player *ngSwitchCase="'video'">
                  <vg-overlay-play></vg-overlay-play>
                  <vg-buffering></vg-buffering>

                  <vg-scrub-bar *ngIf="!isSideBar">
                      <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
                      <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
                  </vg-scrub-bar>

                  <vg-controls>
                      <vg-play-pause></vg-play-pause>
                      <vg-playback-button *ngIf="!isSideBar"></vg-playback-button>

                      <vg-time-display vgProperty="current" vgFormat="mm:ss" *ngIf="!isSideBar"></vg-time-display>

                      <vg-scrub-bar style="pointer-events: none;"></vg-scrub-bar>

                      <vg-time-display vgProperty="left" vgFormat="mm:ss" *ngIf="!isSideBar"></vg-time-display>
                      <vg-time-display vgProperty="total" vgFormat="mm:ss"></vg-time-display>

                      <!-- <vg-track-selector *ngIf="!isSideBar"></vg-track-selector> -->
                      <vg-mute></vg-mute>
                      <vg-volume *ngIf="!isSideBar"></vg-volume>

                      <vg-fullscreen></vg-fullscreen>
                  </vg-controls>

                  <video crossorigin="anonymous" [vgMedia]="media" #media preload="none" class="player" preload="metadata">
                      <source [src]="item?.url" type="item/mp4">

                          <!-- <track kind="subtitles" label="English" src="http://static.itemgular.com/assets/subs/pale-blue-dot.vtt" srclang="en" default> -->

                          Sorry, your browser doesn't support embedded items
                  </video>
              </vg-player>

              <!-- Image -->
              <img class="player" [src]="item?.thumbUrl" [title]="item?.description" *ngSwitchCase="'image'" (click)="openGallery($event)" />
          </span>

          <!-- Item Ratings -->
          <!-- <a href="#" *ngIf="item?.ratings" class="rating pull-right" [title]="avgRating | number:'1.0-1'" alt="Rate this item">
              <img *ngFor="let img of [0,1,2,3,4]" class="favorite" src="assets/images/favorite.png" (click)="rateVideo($event)" [attr.data-id]="img + 1"
                  [ngClass]="{ 'vivid': intRating >= img + 1 }" />
          </a> -->

          <a href="#" (click)="toggleFavorite($event)" class="fav float-right" *ngIf="item?.showHeart">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
          </a>

          <!-- Item Description -->
          <div class="description">
              <p>
                  <span class="capitalize">{{item?.description}}</span>       <!-- | limitDescr -->
                  <span *ngIf="item?.description.length > 200">
                      <!-- &nbsp; <a [routerLink]="['/items', item?.id]" class="more" [title]="item?.description">(More)</a> -->
                  </span>
              </p>
          </div>

          <!-- Tags -->
          <div class="tags" *ngIf="item?.tags">
              <a href="#" *ngFor="let tag of item?.tags" class="tag">
                  {{tag}}
              </a>
          </div>

      </div>
    `,
                styles: [`
      /* Item "Box" */
      .item
      {
          font-family: 'Droid Sans';
          font-size: 1em;
          background: white;

          /* Put some space between items */
          margin: 6px 6px;
          padding: 10px;

          /* Add a nice/soft shadow & border around item boxes */
          -webkit-box-shadow: 0px 0px 8px 1px rgba(235,240,245,1);
                  box-shadow: 0px 0px 8px 1px rgba(235,240,245,1);
          border: 1px rgba(235,240,245,1) solid;

          /* Grid-like display: */
          display: inline-block;
          width: calc(25% - 16px);
      }

      .item.no-padding
      {
          padding: 0;
      }

      /* bootstrap col*-* didn't work that well, and because of the time constraints, I used @media queries */
      @media screen and (max-width: 750px) {
          .item { width: calc(100% - 16px); max-width: 100%; }  /* 99% */
      }
      @media screen and (max-width: 1000px) and (min-width: 751px) {
          .item { width: calc(50% - 16px); max-width: 50%; }  /* 49% */
      }
      @media screen and (max-width: 1200px) and (min-width: 1001px) {
          .item { width: calc(33% - 16px); max-width: 34%; }  /* 32% */
      }

      @media screen and (max-width: 1000px)
      {
          /* Remove padding on small devices */
          .item { padding: 0; }

          /* Adjust ratings icons position */
          .item a.rating { right: 5px; }
      }

      /* Adjust item player/image dimensions */
      .item .player
      {
          width: 100%;
          height: 300px;
          cursor: pointer;
      }

      .name
      {
          line-height: 70px;
          text-indent: 7px;
      }

      /* More ... */
      .more-dot
      {
          height: 60px;
      }
      .more-dot a
      {
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          height: 70px;
      }
      .more-dot img
      {
          padding-right: 10px;
          opacity: 0.4;
      }
      .more-dot img:hover {
          opacity: 1;
      }

      /* Rating icon */
      img.favorite
      {
          opacity: 0.5;
      }

      .item a.rating
      {
          top: 20px;
          position: relative;
      }

      /* Change favorite image opacity if user hover it */
      img:hover.favorite, img.vivid
      {
          opacity: 1;
      }

      /* Item Name */
      h4
      {
          height: 60px;
          line-height: 25px;
          text-overflow: ellipsis;
          overflow: hidden;
      }

          h4 a
          {
              text-decoration: none;
              color: blue;
              border-bottom: 1px solid rgba(39, 109, 170, 0.5);
          }

          h4 a:hover
          {
              border-bottom: 2px solid;
          }

      /* Item Description */
      .description p
      {
          height: 100px;
          overflow: hidden;
          padding: 10px;
      }

      /* Set width to auto if we're loading item as a sidebar (if item details) */
      .auto-width
      {
          width: auto;
      }

      .more
      {
          color: blue;
          text-decoration: underline;
      }

      /* Item Tag */
      div.tags
      {
          margin: 5px;
      }
      a.tag
      {
          display: inline-block;
          padding: 5px;
          background: #f8f9fa;
          color: rgba(73, 80, 87, 0.7);
          margin-right: 7px;
          border-bottom: 2px solid hsl(0, 0%, 80%);
          font-size: 0.9em;

          background: aliceblue;
          border-bottom: 2px solid #007bff;
          color: #007bff;
      }
      a.tag:hover
      {
          text-decoration: none;
          /* color: #495057; */

          background: hsla(208, 100%, 94%, 1);
          border-bottom: 2px solid #007bff;
          color: #007bff;
      }

      /* Dropdown Menu */
      .dropdown
      {
          position: absolute;
          display: none;
          margin: 0;
          width: 50%;
          padding: 0;
          right: 0;
      }
      .dropdown ul
      {
          background: white;
          -webkit-box-shadow: 0px 0px 12px 1px rgba(235,240,245,0.5);
                  box-shadow: 0px 0px 12px 1px rgba(235,240,245,0.5);
          border: 1px rgba(235,240,245,1);
          width: 100%;
          list-style: none;
          padding: 0;
          font-size: 0.9em;

          /* Top Border (works with) */
          border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      /* Dropdown arrow */
      .dropdown:before
      {
          position: absolute;
          top: -7px;
          display: inline-block;
          border-right: 7px solid transparent;
          border-bottom: 7px solid rgba(235, 240, 245, 0.5);
          border-left: 7px solid transparent;
          border-bottom-color: rgba(0, 0, 0, 0.1);
          content: '';
          right: 10px;
      }
  
      .dropdown:after
      {
          position: absolute;
          top: -6px;
          display: inline-block;
          border-right: 6px solid transparent;
          border-bottom: 7px solid #ffffff;
          border-left: 6px solid transparent;
          content: '';
          right: 11px;
      }

      .more-dot:hover ~ .dropdown, .dropdown:hover
      {
          display: block;
      }

      .dropdown li
      {
          cursor: pointer;
          line-height: 35px;
          padding-left: 10px;
      }
      /* .dropdown li:hover
      {
          background: aliceblue;
      } */

      li.separator
      {
          line-height: 1px;
          height: 1px;
      }
      li.separator hr
      {
          border-top-color: aliceblue;
          margin-top: 0;
      }
      .dropdown li a
      {
          color: black;
      }
      .dropdown li:hover a
      {
          text-decoration: underline;
          color: blue;
      }

      /* Favorite Icon */
      a.fav.float-right
      {
          padding: 9px;
          font-size: 1.25em;
          position: absolute;
          bottom: 0;
          right: 5px;
          color: deeppink;
          color: darkorchid;
          color: crimson;
          color: dodgerblue;
          color: lightsteelblue;
          color: wheat;
      }

      /* Capitalize description */
      .capitalize
      {
          text-transform: capitalize;
      }
    `]
            },] },
];
/**
 * @nocollapse
 */
GalleryItemComponent.ctorParameters = () => [
    { type: NotificationService, },
];
GalleryItemComponent.propDecorators = {
    'isSideBar': [{ type: Input },],
    'item': [{ type: Input },],
};

// (Singleton) Notification service used to alert other components of changes & act upon it
class GalleryComponent {
    /**
     * @param {?} notif
     */
    constructor(notif) {
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
    ngOnInit() {
        // Infinite scrolling implemented in home page only
        // (doesn't make sense to add it in sidebar...)
        if (!this.isSideBar) {
            // AFAIA, we can't use conditional listening, ie. combine HostListener() & if(isSideBar),
            // so we have to use the "classic" approach, ie. call addEventListener()
            const /** @type {?} */ that = this;
            document.addEventListener('scroll', () => {
                that.userScrolling();
            }, true);
        }
    }
    /**
     * @return {?}
     */
    userScrolling() {
        // User is scrolling page, load more items if s/he reached bottom:
        if (this.isInViewport(this.scrollMoreDiv.nativeElement)) {
            // load more items
            this.loadMoreItems();
        }
    }
    /**
     * @return {?}
     */
    loadMoreItems() {
        if (this.autoLoadCounter <= this.disableLoadMoreAfter) {
            console.log('loadMoreItems()');
            this.autoLoadCounter++;
            this.notif.loadMoreItems();
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    isInViewport(el) {
        // (Helper function) Return true if element is in viesport (ie. visible!)
        const /** @type {?} */ rect = el.getBoundingClientRect();
        return (rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth));
    }
}
// =========================================================================
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-gallery',
                template: `
      <!-- Welcome Message -->
      <header *ngIf="!isSideBar">
          <p>{{galleryDescr}}</p>
      </header>

      <section>
          <!-- for loop to display (up to 10) gallery items -->
          <app-gallery-item
              *ngFor="let item of galleryItems"
                  [item]="item"
                  [isSideBar]="isSideBar">
          </app-gallery-item>

          <!-- <hr /> -->
          <div class="row text-center" id="loading" *ngIf="!isSideBar">
              <!-- <img src="assets/images/loading.gif" title="Loading more awesome entries..." /> &nbsp;&nbsp; -->

              <button (click)="loadMoreItems()" class="btn blue center">
                  Loading more awesome entries...
              </button>
          </div>

          <div #scrollMore *ngIf="!isSideBar">&nbsp;</div>
      </section>

      <br /><br />
    `,
                styles: [`
      /* ========== Grid "Container" */
      section
      {
          overflow-x: hidden;
      }

      /* ========== Fix a small position anomaly with large width */
      @media screen and (min-width: 1000px)
      {
          section { padding-left: 10px; }
      }

      /* ========== Button */
      .btn
      {
          border-radius: 0;    
      }
      .btn.blue
      {
          background: #207bca;
          -webkit-box-shadow: 0 0 8px 1px hsla(208, 100%, 93%, 1);
                  box-shadow: 0 0 8px 1px hsla(208, 100%, 93%, 1);
          /* border: 1px solid hsla(208, 100%, 94%, 1); */
          color: aliceblue;
      }

      /* ========== "Loading more items..." */
      #loading
      {
          font-weight: bold;
          margin-top: 15px;
      }
      #loading button
      {
          margin: 0 auto;
          cursor: pointer;
      }

      /* ========== Indent Welcome/Greeting Header */
      header
      {
          text-indent: 7px;
      }
    `]
            },] },
];
/**
 * @nocollapse
 */
GalleryComponent.ctorParameters = () => [
    { type: NotificationService, },
];
GalleryComponent.propDecorators = {
    'galleryItems': [{ type: Input },],
    'isSideBar': [{ type: Input },],
    'galleryDescr': [{ type: Input },],
    'mainGalleryId': [{ type: Input },],
    'disableLoadMoreAfter': [{ type: Input },],
    'scrollMoreDiv': [{ type: ViewChild, args: ['scrollMore',] },],
};

// Import PhotoSwipe
class SlideShowComponent {
    constructor() {
        this.images = [];
    }
    /**
     * @param {?=} images
     * @return {?}
     */
    openSlideshow(images) {
        // Build slideshow images array
        images = images || this.images;
        // define options (if needed)
        const /** @type {?} */ options = {
            // optionName: 'option value'
            // for example:
            index: 0 // start at first slide
        };
        // Initializes and opens PhotoSwipe
        const /** @type {?} */ slideShow = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        slideShow.init();
    }
}
// ========================================================================
SlideShowComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-slideshow',
                template: `
      <!-- Root element of PhotoSwipe. Must have class pswp. -->
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" #slideShow>

          <!-- Background of PhotoSwipe. 
                      It's a separate element as animating opacity is faster than rgba(). -->
          <div class="pswp__bg"></div>

          <!-- Slides wrapper with overflow:hidden. -->
          <div class="pswp__scroll-wrap">

              <!-- Container that holds slides. 
                      PhotoSwipe keeps only 3 of them in the DOM to save memory.
                      Don't modify these 3 pswp__item elements, data is added later on. -->
              <div class="pswp__container">
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
                  <div class="pswp__item"></div>
              </div>

              <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
              <div class="pswp__ui pswp__ui--hidden">

                  <div class="pswp__top-bar">

                      <!--  Controls are self-explanatory. Order can be changed. -->

                      <div class="pswp__counter"></div>

                      <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                      <button class="pswp__button pswp__button--share" title="Share"></button>
                      <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                      <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                      <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                      <!-- element will get class pswp__preloader--active when preloader is running -->
                      <div class="pswp__preloader">
                          <div class="pswp__preloader__icn">
                              <div class="pswp__preloader__cut">
                                  <div class="pswp__preloader__donut"></div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                      <div class="pswp__share-tooltip"></div>
                  </div>

                  <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                  <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

                  <div class="pswp__caption">
                      <div class="pswp__caption__center"></div>
                  </div>
              </div>
          </div>
      </div>
    `,
                styles: [`
      .pswp__bg
      {
          background: rgba(0, 0, 0, 0.9);
      }
    `]
            },] },
];
/**
 * @nocollapse
 */
SlideShowComponent.ctorParameters = () => [];
SlideShowComponent.propDecorators = {
    'photoSwipe': [{ type: ViewChild, args: ['slideShow',] },],
    'images': [{ type: Input },],
};

// Singleton Services
// Video (videogular2) modules
class GalleryModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: GalleryModule,
            providers: [
                NotificationService
            ]
        };
    }
}
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
GalleryModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { NotificationService, GalleryItemComponent, GalleryComponent, SlideShowComponent, GalleryModule };
//# sourceMappingURL=ng4-gallery.js.map
