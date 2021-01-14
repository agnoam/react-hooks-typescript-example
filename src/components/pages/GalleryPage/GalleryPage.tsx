import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { Grow, Input, InputLabel } from '@material-ui/core';
import { PhotoSwipeGallery, PhotoSwipeGalleryItem } from 'react-photoswipe';
import './GalleryPage.scss';
import 'react-photoswipe/lib/photoswipe.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
// import InfiniteScroll from "react-infinite-scroll-component";
import { searchImageByName, ImageObj } from "../../shared/httpService";
// import { RingLoader } from 'halogenium';

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
    _state ? _state.nameToSearch = e.target.value : _state = new GalleryState(e.target.value, [], []);
    
    setState(_state);
}

const getThumbnailContent = (item: PhotoSwipeGalleryItem) => {
    return (
      <LazyLoadImage
        alt=""
        width="120"
        height="70"
        src={item.thumbnail} />
    );
}

const handleImagesLoad = async (
    e: any /* : KeyboardEvent<HTMLTextAreaElement | HTMLInputElement> */,
    state: GalleryState | undefined, 
    setState: Dispatch<SetStateAction<GalleryState | undefined>>
): Promise<void> => {
    if (e.code === 'Enter' && state?.nameToSearch.length) {
        console.log(state.nameToSearch);
        const images: ImageObj[] | undefined = await searchImageByName(state.nameToSearch);
        
        // Convert from ImageObj to PhotoSwipeItem
        if (images) {
            const photoSwipeItems: PhotoSwipeGalleryItem[] = [];

            images.map((imageObj: ImageObj) => photoSwipeItems.push({ 
                src: imageObj.originalURL,
                thumbnail: imageObj.thumbnailURL,
                w: imageObj.width,
                h: imageObj.height
            }));

            let _state: GalleryState = state as GalleryState;
            _state ? _state.items = photoSwipeItems : _state = new GalleryState('', [], photoSwipeItems);
            setState(_state);
        }
    }
}

const GalleryPage = () => {
    const history = useHistory();
    const [state, setState] = useState<GalleryState>(new GalleryState('', [], []));

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
                {/* <PhotoSwipeGallery isOpen={false} items={items} options={{}} thumbnailContent={getThumbnailContent} />
                <InfiniteScroll 
                    dataLength={5}
                    next={() => console.log('reading next')}
                    hasMore={true} 
                    loader={<p>Loading...</p>}
                    children={items}
                /> */}
                <PhotoSwipeGallery 
                    isOpen={false} 
                    items={state?.items} 
                    options={{ closeOnScroll: true, pinchToClose: true }} 
                    thumbnailContent={getThumbnailContent} />
                {/* <InfiniteScroll
                    dataLength={state?.items.length || 0}
                    next={() => mockHttp(state, setState as any)}
                    hasChildren={!!state?.items.length}
                    hasMore={false}
                    loader={<div className="loader-container"><RingLoader color="#36d7b7" loading={true} size='35px' /></div>}>
                    { 
                        state?.items.length ? 
                            state?.items.map((item, i) => <div><p>i</p></div>)
                        :
                            <p>There is no images to show</p>
                    }
                </InfiniteScroll> */}
            </div>
        </div>
    );
}

class GalleryState {
    nameToSearch: string;
    results: any[];
    items: PhotoSwipeGalleryItem[];

    constructor(nameToSearch: string, results: any[], items: PhotoSwipeGalleryItem[]) {
        this.nameToSearch = nameToSearch;
        this.results = results;
        this.items = items;
    }
}

export default GalleryPage;