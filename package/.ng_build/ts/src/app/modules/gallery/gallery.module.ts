import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule                  } from '@angular/common';

import { SlideShowComponent   } from '../../components/slideshow/slideshow.component';
import { GalleryComponent     } from '../../components/gallery/gallery.component';
import { GalleryItemComponent } from '../../components/gallery-item/gallery-item.component';

// Singleton Services
import { NotificationService  } from '../../services/notification/notification.service';

// Video (videogular2) modules
import { VgCoreModule        } from 'videogular2/core';
import { VgControlsModule    } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule   } from 'videogular2/buffering';

@NgModule({
    imports: [
        CommonModule,

        // Video / videogular2 modules
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
    ],
    declarations: [
        SlideShowComponent,
        GalleryComponent,
        GalleryItemComponent,
    ],
    exports: [
        SlideShowComponent,
        GalleryComponent,
        GalleryItemComponent,
    ]
})
export class GalleryModule
{
    public static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: GalleryModule,
            providers: [
                NotificationService
            ]
        };
    }
}
