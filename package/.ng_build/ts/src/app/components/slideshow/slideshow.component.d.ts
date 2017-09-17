import { ElementRef } from '@angular/core';
import { IImage } from '../../interfaces/image';
export declare class SlideShowComponent {
    photoSwipe: ElementRef;
    images: IImage[];
    constructor();
    openSlideshow(images?: IImage[]): void;
}
