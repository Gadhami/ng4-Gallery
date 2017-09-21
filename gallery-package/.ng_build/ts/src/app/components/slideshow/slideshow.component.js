import { Component, ViewChild, Input } from '@angular/core';
// Import PhotoSwipe
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
export class SlideShowComponent {
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
function SlideShowComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SlideShowComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SlideShowComponent.ctorParameters;
    /** @type {?} */
    SlideShowComponent.propDecorators;
    /** @type {?} */
    SlideShowComponent.prototype.photoSwipe;
    /** @type {?} */
    SlideShowComponent.prototype.images;
}
//# sourceMappingURL=slideshow.component.js.map