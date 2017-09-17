import { Observable } from 'rxjs/Observable';
export declare class NotificationService {
    private slideshowOpenedSource;
    private moreItemsRequestedSource;
    private favoriteToggledSource;
    slideShowOpened$: Observable<string>;
    moreItemsRequested$: Observable<{}>;
    favoriteChanged$: Observable<string>;
    openSlideShow(id: string): void;
    loadMoreItems(): void;
    toggleFavorite(id: string): void;
}
