import { Component, OnInit, Input } from '@angular/core';
import { Router                   } from '@angular/router';

// Import gallery item Interface
import { IGalleryItem        } from '../../interfaces/gallery-item';

// (Singleton) Notification service used to alert other components of changes & act upon it
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector   : 'app-gallery-item',
    templateUrl: './gallery-item.component.html',
    styleUrls  : ['./gallery-item.component.css']
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
