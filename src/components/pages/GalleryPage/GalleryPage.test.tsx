// import React from 'react';
// import { render, screen } from '@testing-library/react';
import /* GalleryPage,*/ { getCreds } from './GalleryPage';
// import { LocalStorageKeys } from '../../../constants/localStorage.keys';

describe('GalleryPage tests', () => {
    // test('Requesting for GalleryPage without credentials', () => {
    //     // Making sure the credentials are deleted
    //     localStorage.removeItem(LocalStorageKeys.Credentials);
        
    //     render(<GalleryPage />);
    //     screen.
    // });

    test('Getting credentials from localStorage', () => {
        const credentials = getCreds();
        expect(credentials).toEqual({});
    });
});

// const fetchMoreData = (setState: Dispatch<SetStateAction</* GalleryState */ any>>) => {
//     // a fake async api call like which sends
//     // 3 more records in 1.5 secs
//     setTimeout(() => {
//         const newItems/* : PhotoGallery[] */ = [{
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         }
//         ,{
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             width: 1920,
//             height: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             width: 1920,
//             height: 1080
//         }];

//         setState((state: any) => {
//             return { ...state, items: state?.items.concat(newItems) }
//         });
//     }, 1500);
// }