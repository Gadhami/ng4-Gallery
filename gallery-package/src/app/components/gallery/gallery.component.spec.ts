import { NO_ERRORS_SCHEMA                 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryComponent                 } from './gallery.component';

// ========================================================================
describe('GalleryComponent', () =>
{
    let component: GalleryComponent;
    let fixture: ComponentFixture<GalleryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [GalleryComponent]
        })
        .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture   = TestBed.createComponent(GalleryComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // ========================================================================
    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
    // ========================================================================
});
