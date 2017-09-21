import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

// Gallery interface
import { IGalleryItem        } from '../../interfaces/gallery-item';

// (Singleton) Notification service used to alert other components of changes & act upon it
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector   : 'app-gallery',
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
            console.log('loadMoreItems()');

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
