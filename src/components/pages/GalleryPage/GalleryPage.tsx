import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { Input, InputLabel } from '@material-ui/core';
import { PhotoSwipeGallery, PhotoSwipeGalleryItem } from 'react-photoswipe';
import './GalleryPage.scss';
import 'react-photoswipe/lib/photoswipe.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { HttpService } from "../../shared/httpService";
import { RingLoader } from 'halogenium';

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
    _state ? _state.nameToSearch = e.target.value : _state = new GalleryState(e.target.value, [], [{
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    }]);
    
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

const mockHttp = (state: GalleryState | undefined, setState: Dispatch<SetStateAction<GalleryState | undefined>>): void => {
    const mockData = [{
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
        thumbnail: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://picsum.photos/200/300',
        thumbnail: 'https://picsum.photos/200/300',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    },
    {
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    }];

    let _state: GalleryState = state as GalleryState;
    _state.items ? _state.items.concat(mockData) : _state = new GalleryState('', [], mockData);
    console.log('setting new state', _state);
    setState(_state);
}

const GalleryPage = () => {
    const history = useHistory();
    const [state, setState] = useState<GalleryState>(new GalleryState('', [], [{
        src: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        thumbnail: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
        w: 1980,
        h: 1080
    }]));
    const items: PhotoSwipeGalleryItem[] = []

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
                <Input 
                    id="name-input"
                    autoFocus={true}
                    onChange={(e) => handleNameChange(e, state, setState as any)} />
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
                <InfiniteScroll
                    dataLength={state?.items.length || 0}
                    next={() => mockHttp(state, setState as any)}
                    hasChildren={!!state?.items.length}
                    hasMore={false}
                    loader={<div className="loader-container"><RingLoader color="#36d7b7" loading={true} size='35px' /></div>}>
                    { 
                        // items.length ? 
                            <PhotoSwipeGallery 
                                isOpen={false} 
                                items={state?.items || []} 
                                options={{}} 
                                thumbnailContent={getThumbnailContent} />
                        // :
                            // <p>There is no images to show</p>
                    }
                </InfiniteScroll>
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