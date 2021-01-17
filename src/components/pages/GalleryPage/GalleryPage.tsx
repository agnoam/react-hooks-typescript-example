import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { Grow, Input, InputLabel } from '@material-ui/core';
import { PhotoSwipeGallery, PhotoSwipeGalleryItem } from 'react-photoswipe';
import './GalleryPage.scss';
import 'react-photoswipe/lib/photoswipe.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
// import InfiniteScroll from 'react-infinite-scroller';
import { searchImageByName, ImageObj } from "../../shared/httpService";
import Gallery, { PhotoClickHandler,  } from "react-photo-gallery";
// import Gallery from "react-photo-gallery";
// import { RingLoader } from 'halogenium'; 

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


/**
 * @description Moving to login page by react-router-dom
 * @param history History of `react-router-dom`
 */
const moveToLoginPage = (history: any): void => {
    history.push('/login');
}

/**
 * @description Getting the credentials from browser's localStorage
 * @returns The credentials of the user if exists
 */
const getCreds = (): Credentials => {
    try {
        // Stringified value from localStorage
        const strValue = localStorage.getItem(LocalStorageKeys.Credentials);
        console.log('value from localStorage:', strValue);
        return JSON.parse(strValue || '{}');
    } catch(ex) {
        console.error('getCreds ex', ex);
        return { username: '', password: '' };
    }
}

/**
 * @description Handles the image search
 * 
 * @param e The `$event` from the onChange funciton of the input
 * @param state Current state of the page
 * @param setState SetState function
 */
function handleNameChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, 
    state: GalleryState | undefined, 
    setState: Dispatch<SetStateAction<GalleryState | undefined>>
): void {
    let _state: GalleryState = state as GalleryState;
    _state ? _state.nameToSearch = e.target.value : _state = new GalleryState(e.target.value, -1, []);
    
    setState(_state);
}

const getThumbnailContent = (item: PhotoSwipeGalleryItem) => {
    return (
        <div>
        {
            item && <LazyLoadImage
                alt=""
                width="120"
                height="70"
                src={item.thumbnail} />
        }
        </div>
    );
}

// const fetchMoreData = (state: GalleryState, setState: any) => {
//     // a fake async api call like which sends
//     // 3 more records in 1.5 secs
//     setTimeout(() => {
//         const newItems: PhotoSwipeGalleryItem[] = [{
//             src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             thumbnail: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
//             w: 1920,
//             h: 1080
//         },
//         {
//             src: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             thumbnail: 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
//             w: 1920,
//             h: 1080
//         },
//         {
//             src: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             thumbnail: 'https://killerattitudestatus.in/wp-content/uploads/2019/12/gud-night-images.jpg',
//             w: 1920,
//             h: 1080
//         }];

//         setState({
//             items: state?.items.concat(newItems)
//         });
//     }, 1500);
// }

const handleImagesLoad = async (
    e: any /* : KeyboardEvent<HTMLTextAreaElement | HTMLInputElement> */,
    state: GalleryState,
    setState: any
): Promise<void> => {
    if (e.code === 'Enter' && state?.nameToSearch.length) {
        console.log(state.nameToSearch);
        const images: ImageObj[] | undefined = await /* searchImageByName(state.nameToSearch) */ [{
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUfQcvjHXO0Xr8vxOxOs1IYQcKgI9kWi8XOw&usqp=CAU',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            thumbnailURL: 'https://cdn.cnn.com/cnnnext/dam/assets/191203174105-edward-whitaker-1-large-169.jpg',
            width: 1920,
            height: 1080
        },
        {
            originalURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            thumbnailURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvX64_RjaueucuGMual196Ai7sp6PewhquMg&usqp=CAU',
            width: 1080,
            height: 1920
        }];
        
        // Convert from ImageObj to PhotoSwipeItem
        if (images) {
            console.log('images are: ', images);
            const photoSwipeItems: PhotoGallery[] = [];

            for (const imageObj of images) {
                photoSwipeItems.push({ 
                    src: imageObj.originalURL,
                    // thumbnail: imageObj.thumbnailURL,
                    width: imageObj.width,
                    height: imageObj.height
                });
            }
            
            setState((state: GalleryState) => {
                if (state)
                    return new GalleryState(state.nameToSearch, state.viewPhoto, photoSwipeItems);
                return new GalleryState('', -1, photoSwipeItems);
            });
        }
    }
}

const GalleryPage = () => {
    const history = useHistory();
    const [state, setState] = useState<GalleryState>(new GalleryState('', -1, []));

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    }, [history]);

    console.log('state', state);
    return (
        <div className="page-content">
            <p>GalleryPage</p>
            <div id="input-container">
                <InputLabel htmlFor="name-input"></InputLabel>
                <Grow in={true}>
                    <Input 
                        id="name-input"
                        autoFocus={true}
                        onKeyDown={(e) => handleImagesLoad(e, state, setState as any)}
                        onChange={(e) => handleNameChange(e, state, setState as any)} />
                </Grow>
            </div>
            
            <div className="gallery-container">
                {/* Working example with PhotoSwipe */}
                {/* <InfiniteScroll
                    pageStart={0}
                    loadMore={() => fetchMoreData(state, setState)}
                    hasMore={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                > */}
                    {/* <PhotoSwipeGallery 
                        isOpen={false} 
                        items={state?.items} 
                        options={{ closeOnScroll: true, pinchToClose: true }} 
                        thumbnailContent={getThumbnailContent} /> */}
                    {
                        state?.viewPhoto >= 0 ? 
                            <Lightbox
                                mainSrc={state?.items[state?.viewPhoto]?.src}
                                discourageDownloads={true}
                                enableZoom={true}
                                onCloseRequest={() => {setState((state) => { return { ...state, viewPhoto: -1 } }) }}
                            />
                        :
                            <Gallery 
                                photos={state?.items} 
                                onClick={(e, photos) => setState((state) => {
                                    return new GalleryState(state.nameToSearch, photos.index, state.items)
                                })}
                            />
                    }
                {/* </InfiniteScroll> */}
            </div>
        </div>
    );
}

class GalleryState {
    constructor(
        public nameToSearch: string, 
        public viewPhoto: number, // Image index in items 
        public items: PhotoGallery[]
    ) {}
}

interface PhotoGallery {
    src: string;
    srcSet?: string | string[] | undefined;
    sizes?: string | string[] | undefined;
    width: number;
    height: number;
    alt?: string | undefined;
    key?: string | undefined;
}

export default GalleryPage;