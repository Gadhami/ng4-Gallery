import { NO_ERRORS_SCHEMA                 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemComponent    } from './gallery-item.component';

import { NotificationService     } from 'app/services/notification/notification.service';
import { MockNotificationService } from 'app/mocks/notification-service.mock';

// =========================================================================
describe('GalleryItemComponent', () =>
{
    let component: GalleryItemComponent;
    let fixture  : ComponentFixture<GalleryItemComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            schemas     : [NO_ERRORS_SCHEMA],
            declarations: [GalleryItemComponent],
            providers: [
                { provide: NotificationService, useClass: MockNotificationService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture   = TestBed.createComponent(GalleryItemComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    // =========================================================================
    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
    // =========================================================================
});
