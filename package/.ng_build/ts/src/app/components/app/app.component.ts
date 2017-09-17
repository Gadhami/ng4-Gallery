import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { SlideShowComponent  } from 'app/components/slideshow/slideshow.component';

// Image Interface
import { IImage              } from 'app/interfaces/image';
import { IGalleryItem        } from 'app/interfaces/gallery-item';

// (Singleton) Notification service used to alert other components of changes & act upon it
import { NotificationService } from 'app/services/notification/notification.service';
import { DestroySubscribers  } from 'app/decorators/destroy-subscribers';

@Component({
    selector   : 'app-root',
    template: `
      <app-top-header>Portfolio</app-top-header>

      <!-- Gallery / Grid -->
      <app-gallery
          [galleryItems]="galleryItems">
      </app-gallery>

      <!-- SlideShow -->
      <app-slideshow #slideShow></app-slideshow>
    `,
    styles: [`

    `]
})
@DestroySubscribers()
export class AppComponent implements OnInit
{
    public subscribers: any = {};

    galleryItems: IGalleryItem[] = [];

    @ViewChild('slideShow') photoSwipe: SlideShowComponent;

    // ========================================================================
    constructor(private notif: NotificationService)
    { }

    // ========================================================================
    ngOnInit()
    {
        this.subscribeNotifications();
        this.loadMoreItems();
    }

    // ========================================================================
    subscribeNotifications()
    {
        // ========================
        // Listen to gallery & slideShow notifications & act accordingly
        // ========================
        const that                         = this;

        // Open new SlideShow
        this.subscribers.onNewSlideShow    = this.notif.slideShowOpened$.subscribe((id: string) =>
        {
            that.openSlideshow(id);
        });

        // Load more items (images, videos, ...)
        this.subscribers.onLoadMore        = this.notif.moreItemsRequested$.subscribe(() =>
        {
            that.loadMoreItems();
        });

        // User toggled item as favorite
        this.subscribers.onFavoriteChanged = this.notif.favoriteChanged$.subscribe(() =>
        {
            // that.loadMoreItems();
        });
    }

    // ========================================================================
    loadMoreItems()
    {
        // Generate a "fake Grid" for demo purposes

        // Random company / project / website / name
        const names = [
            'Github', 'Unicef.org', 'Google', 'Facebook', 'Twitter', 'BuzzFeed', 'IBM', 'Microsoft', 'Wired',
            'Wikipedia', 'Oracle', 'CloudFlare', 'Wordpress.org', 'Apple', 'Amazon', 'StackOverflow', 'Adobe',
            'Digg', 'Ask', 'php.net'
        ];

        // Tags
        const tags = [
            'ASP.NET', 'C#', 'Angular 2', 'React', 'Javascript', 'Azure', 'ASP.NET MVC', 'ASP.NET Core', 'NativeScript',
            'jQuery', 'CSS', 'Photoshop', 'NPM', 'Node.js', 'Grunt', 'WebPack', 'Protractor', 'Selenium', 'Bootstrap',
            'Apache', 'MySQL', 'SQL Server', 'XML', 'JSON', 'CI', 'SOA', 'SDLC', 'AWS', 'Ruby', 'PHP'
        ];

        // Fake description
        const loremIpsum = [
            'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
            'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
            'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
            'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
            'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
            'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
            'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
            'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
            'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
            'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
            'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
            'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
            'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis',
            'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
            'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
            'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
            'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
            'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
            'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
            'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
            'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
            'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
            'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
            'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
            'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
            'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
            'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
            'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
            'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
            'elementum', 'tempor', 'risus', 'cras'
        ];

        for (let i = 0; i <= 15; i++)
        {
            const w = Math.ceil(Math.random() * (1200 - 600)) + 600,
                  h = Math.ceil(Math.random() * (1200 - 600)) + 600;

            // Random image
            const img = Math.ceil(Math.random() * (38 - 0)) + 1;

            // Random company / project / website / name
            const idx = Math.ceil(Math.random() * (names.length - 1));

            // Item description
            const wordsNbr      = Math.ceil(Math.random() * 15);
            const shuffledWords = loremIpsum.sort(() => .5 - Math.random());
            const description   = shuffledWords.slice(0, 10).join(' ');

            // Tags
            const tagsNbr      = Math.ceil(Math.random() * 5);
            const shuffledTags = tags.sort(() => .5 - Math.random());
            const projectTags  = shuffledTags.slice(0, tagsNbr);
            if (tagsNbr >= 4)
            {
                projectTags[4] = '...';
            }

            this.galleryItems.push({
                id: i.toString(),
                type: 'image',
                name: names[idx],
                thumbUrl: `assets/images/thumb/${img}.jpg`,     // 'http://via.placeholder.com/200x200',
                url: `http://via.placeholder.com/${w}x${h}`,
                description: description,
                tags: projectTags,
                showHeart: true,
            });
        }
    }

    // ========================================================================
    openSlideshow(id: string)
    {
        // Let's generate a random images array
        const images: IImage[] = [];

        for (let i = 0; i <= 24; i++)
        {
            const w = Math.ceil(Math.random() * (1200 - 600)) + 600,
                  h = Math.ceil(Math.random() * (1200 - 600)) + 600;

            images.push({
                src: `http://via.placeholder.com/${w}x${h}`,
                w: w,
                h: h
            });
        }

        // Open slideshow!
        this.photoSwipe.openSlideshow(images);
    }
    // ========================================================================
}
