import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject    } from 'rxjs/Subject';

@Injectable()
export class NotificationService
{
    // Observable string sources
    private slideshowOpenedSource    = new Subject<string>();
    private moreItemsRequestedSource = new Subject();
    private favoriteToggledSource    = new Subject<string>();

    // Observable string streams
    slideShowOpened$    = this.slideshowOpenedSource.asObservable();
    moreItemsRequested$ = this.moreItemsRequestedSource.asObservable();
    favoriteChanged$    = this.favoriteToggledSource.asObservable();

    // Service message commands
    openSlideShow(id: string)  { this.slideshowOpenedSource.next(id);    }
    loadMoreItems()            { this.moreItemsRequestedSource.next();   }

    toggleFavorite(id: string) { this.moreItemsRequestedSource.next(id); }
}
