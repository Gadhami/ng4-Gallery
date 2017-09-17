import { Component, ViewChild, ElementRef, Input } from '@angular/core';

// Import PhotoSwipe
import PhotoSwipe           from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

// Image Interface
import { IImage } from '../../interfaces/image';

@Component({
    selector   : 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls  : ['./slideshow.component.css']
})
export class SlideShowComponent
{
    @ViewChild('slideShow') photoSwipe: ElementRef;

    @Input() images: IImage[] = [];

    // ========================================================================
    constructor() { }

    // ========================================================================
    openSlideshow(images?: IImage[])
    {
        // Build slideshow images array
        images = images || this.images;

        // define options (if needed)
        const options = {
            // optionName: 'option value'
            // for example:
            index: 0 // start at first slide
        };

        // Initializes and opens PhotoSwipe
        const slideShow = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
        slideShow.init();
    }
    // ========================================================================
}
