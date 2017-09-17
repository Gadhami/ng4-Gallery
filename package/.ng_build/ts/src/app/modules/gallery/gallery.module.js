import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideShowComponent } from '../../components/slideshow/slideshow.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { GalleryItemComponent } from '../../components/gallery-item/gallery-item.component';
// Singleton Services
import { NotificationService } from '../../services/notification/notification.service';
// Video (videogular2) modules
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
export class GalleryModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: GalleryModule,
            providers: [
                NotificationService
            ]
        };
    }
}
GalleryModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
GalleryModule.ctorParameters = () => [];
function GalleryModule_tsickle_Closure_declarations() {
    /** @type {?} */
    GalleryModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    GalleryModule.ctorParameters;
}
//# sourceMappingURL=gallery.module.js.map