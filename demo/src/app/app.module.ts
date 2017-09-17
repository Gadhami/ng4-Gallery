import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';

import { GalleryModule } from 'ng4-gallery';
import { AppComponent  } from 'app/components/app/app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        GalleryModule.forRoot(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
