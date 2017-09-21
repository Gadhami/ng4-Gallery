import { OnInit } from '@angular/core';
import { IGalleryItem } from '../../interfaces/gallery-item';
import { NotificationService } from '../../services/notification/notification.service';
export declare class GalleryItemComponent implements OnInit {
    private notif;
    isSideBar: boolean;
    item: IGalleryItem;
    isLoading: boolean;
    error: string;
    constructor(notif: NotificationService);
    ngOnInit(): void;
    openGallery(e: any): void;
    toggleFavorite(e: any): void;
}
