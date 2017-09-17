import { Component, OnInit, Input } from '@angular/core';
import { Router                   } from '@angular/router';

// Import gallery item Interface
import { IGalleryItem        } from '../../interfaces/gallery-item';

// (Singleton) Notification service used to alert other components of changes & act upon it
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector   : 'app-gallery-item',
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
})
export class GalleryItemComponent implements OnInit
{
    // If isSideBar = true, re-arrange UI to show 1 item per column
    @Input() isSideBar = false;

    @Input() item: IGalleryItem = {
        id         : '',
        description: '',
        name       : '',
        ratings    : [],
        url        : '',
        tags       : [],
        type       : 'image',
        showHeart  : true,
    };

    isLoading = false;
    error     : string;

    // =========================================================================
    constructor(private notif: NotificationService)
    { }

    // =========================================================================
    ngOnInit()
    {
        // Define default dropdown menu items
        if (!this.item.menu)
        {
            this.item.menu = [
                { name: 'Github Repo', url: '#', isSeparator: false },
                { name: 'Website',     url: '#', isSeparator: false },
                { name: '',            url: '#', isSeparator: true  },
                { name: 'More...',     url: '#', isSeparator: false },
            ];
        }
    }

    // =========================================================================
    openGallery(e)
    {
        console.log('openGallery()');

        e.preventDefault();
        this.notif.openSlideShow(this.item.id);
    }

    // =========================================================================
    toggleFavorite(e)
    {
        e.preventDefault();
        this.notif.toggleFavorite(this.item.id);
    }
    // =========================================================================
}
