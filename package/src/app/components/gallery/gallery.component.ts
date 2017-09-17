import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

// Gallery interface
import { IGalleryItem        } from '../../interfaces/gallery-item';

// (Singleton) Notification service used to alert other components of changes & act upon it
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector   : 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls  : ['./gallery.component.css']
})
export class GalleryComponent implements OnInit
{
    // Set "isLoadingGallerys" to True if we're already loading videos (to avoid
    // sending multiple requests in case user keeps scrolling)
    isLoadingGallery = false;
    error            = '';
    @Input() galleryItems  : IGalleryItem[] = [];

    // True => user is loading index page   |   False => user is viewing gallery item details page
    @Input() isSideBar     = false;

    @Input() galleryDescr  = '';

    // Only valid if video is loading as a side bar, store the main video's ID
    // Variable used to skip loading the same video both as main one and on the side bar!
    @Input() mainGalleryId = '';

    // Disable items auto-loading after 5 times
    @Input() disableLoadMoreAfter = 5;
    private autoLoadCounter       = 0;

    @ViewChild('scrollMore') scrollMoreDiv: ElementRef;


    // =========================================================================
    constructor(private notif: NotificationService)
    { }

    // =========================================================================
    ngOnInit()
    {
        // Infinite scrolling implemented in home page only
        // (doesn't make sense to add it in sidebar...)
        if (!this.isSideBar)
        {
            // AFAIA, we can't use conditional listening, ie. combine HostListener() & if(isSideBar),
            // so we have to use the "classic" approach, ie. call addEventListener()

            const that = this;
            document.addEventListener('scroll', () =>
            {
                that.userScrolling();
            }, true);
        }
    }

    // =========================================================================
    // @HostListener('document:scroll')
    userScrolling()
    {
        // User is scrolling page, load more items if s/he reached bottom:
        if (this.isInViewport(this.scrollMoreDiv.nativeElement))
        {
            // load more items
            this.loadMoreItems();
        }
    }

    // =========================================================================
    loadMoreItems()
    {
        if (this.autoLoadCounter <= this.disableLoadMoreAfter)
        {
            this.autoLoadCounter++;
            this.notif.loadMoreItems();
        }
    }

    // =========================================================================
    isInViewport(el)
    {
        // (Helper function) Return true if element is in viesport (ie. visible!)

        const rect = el.getBoundingClientRect();

        return (
            rect.bottom >= 0 &&
            rect.right  >= 0 &&
            rect.top    <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left   <= (window.innerWidth  || document.documentElement.clientWidth)
        );
    }
    // =========================================================================
}
