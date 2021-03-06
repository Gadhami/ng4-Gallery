import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideShowComponent               } from './slideshow.component';

// ========================================================================
describe('SlideShowComponent', () =>
{
    let component: SlideShowComponent;
    let fixture  : ComponentFixture<SlideShowComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SlideShowComponent]
        })
        .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture   = TestBed.createComponent(SlideShowComponent);
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
