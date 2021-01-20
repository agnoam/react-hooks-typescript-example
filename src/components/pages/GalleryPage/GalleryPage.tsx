import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { searchImageByName, ImageObj } from "../../shared/httpService";
import Gallery from "react-photo-gallery";
import { RingLoader } from 'halogenium'; 
import InfiniteScroll from "react-infinite-scroller";
import SearchInput from "./SearchInput/SearchInput";
import Config from '../../../constants/config.json';

// @ts-ignore 
import Lightbox from "react-awesome-lightbox";

import './GalleryPage.scss';
import "react-awesome-lightbox/build/style.css";


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
    setState: Dispatch<SetStateAction<GalleryState>>
): void {
    setState((state) => { 
        return { ...state, nameToSearch: e?.target.value || '' } 
    });
}

/**
 * @description The function handles the loading images process from the web service
 * 
 * @param state The current state of the app
 * @param setState The setState function reference
 * @param startingIndex The index of the first image that will received (optional, used by InfiniteScroll)
 * @param batchSize The size of the chunk we will receive from the web service (optional)
 */
const handleImagesLoad = async (
    state: GalleryState,
    setState: Dispatch<React.SetStateAction<GalleryState>>,
    startingIndex: number,
    batchSize: number = 30
): Promise<void> => {
    if (state?.nameToSearch.length || (state?.nameToSearch.length && startingIndex > 0 && batchSize > 0)) {
        try {
            const images: ImageObj[] | undefined = await searchImageByName(state.nameToSearch, startingIndex, batchSize);
            
            // Convert from ImageObj to PhotoItem
            if (images) {
                const newItems: PhotoGallery[] = [];

                for (const imageObj of images) {
                    newItems.push({ 
                        src: imageObj.originalURL,
                        width: imageObj.width,
                        height: imageObj.height
                    });
                }
                
                setState((state: GalleryState) => {
                    return startingIndex > 0 && batchSize > 0 ? 
                        { ...state, items: state.items.concat(newItems) }    
                    :
                        { ...state, items: newItems }
                });
            }
        } catch(ex) {
            // setState((state) => )
            console.error(ex);
        }
    }
}

/**
 * @description Renders the loading spinner icon
 * @returns Element of the loading spinner
 */
const renderLoader = () => {
    return (
        <div className='loader-container'>
            <RingLoader size='25px' color='#26A65B' />
        </div>
    );
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
            <SearchInput 
                onChange={(e) => { 
                    handleNameChange(e, setState);
                    handleImagesLoad(state, setState, e);
                }} />
            
            <div className="gallery-container">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => handleImagesLoad(state, setState, state?.items.length - 1, Config.galleryPage.infiniteScrollBatchSize)}
                    hasMore={!!state?.nameToSearch}
                    loader={renderLoader()}>
                    {
                        state?.viewPhoto >= 0 ? 
                            <Lightbox
                                startIndex={state.viewPhoto}
                                images={state.items.map((item) => item.src)}
                                onClose={() => {
                                    setState((state) => { 
                                        return { ...state, viewPhoto: -1 } 
                                    });
                                }} />
                        :
                            state?.items.length && state?.nameToSearch ?
                                <Gallery 
                                    photos={state?.items} 
                                    onClick={(e, photos) => setState((state) => {
                                        console.log(photos.index);
                                        return new GalleryState(state.nameToSearch, photos.index, state.items)
                                    })}
                                />
                            :
                                <p className='nothing-to-show-subtitle'>There is nothing to show</p>
                    }
                </InfiniteScroll>
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