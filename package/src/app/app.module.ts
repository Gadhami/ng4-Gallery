import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';

import { GalleryModule } from 'app/modules/gallery/gallery.module';

import { AppComponent        } from 'app/components/app/app.component';
import { TopHeaderComponent  } from 'app/components/top-header/top-header.component';

@NgModule({
    declarations: [
        AppComponent,
        TopHeaderComponent,
    ],
    imports: [
        BrowserModule,
        GalleryModule.forRoot(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
