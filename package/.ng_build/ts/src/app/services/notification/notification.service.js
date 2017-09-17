import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class NotificationService {
    constructor() {
        this.slideshowOpenedSource = new Subject();
        this.moreItemsRequestedSource = new Subject();
        this.favoriteToggledSource = new Subject();
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
function NotificationService_tsickle_Closure_declarations() {
    /** @type {?} */
    NotificationService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NotificationService.ctorParameters;
    /** @type {?} */
    NotificationService.prototype.slideshowOpenedSource;
    /** @type {?} */
    NotificationService.prototype.moreItemsRequestedSource;
    /** @type {?} */
    NotificationService.prototype.favoriteToggledSource;
    /** @type {?} */
    NotificationService.prototype.slideShowOpened$;
    /** @type {?} */
    NotificationService.prototype.moreItemsRequested$;
    /** @type {?} */
    NotificationService.prototype.favoriteChanged$;
}
//# sourceMappingURL=notification.service.js.map