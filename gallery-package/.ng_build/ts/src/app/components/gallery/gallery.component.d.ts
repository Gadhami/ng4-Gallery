import { OnInit, ElementRef } from '@angular/core';
import { IGalleryItem } from '../../interfaces/gallery-item';
import { NotificationService } from '../../services/notification/notification.service';
export declare class GalleryComponent implements OnInit {
    private notif;
    isLoadingGallery: boolean;
    error: string;
    galleryItems: IGalleryItem[];
    isSideBar: boolean;
    galleryDescr: string;
    mainGalleryId: string;
    disableLoadMoreAfter: number;
    private autoLoadCounter;
    scrollMoreDiv: ElementRef;
    constructor(notif: NotificationService);
    ngOnInit(): void;
    userScrolling(): void;
    loadMoreItems(): void;
    isInViewport(el: any): boolean;
}
