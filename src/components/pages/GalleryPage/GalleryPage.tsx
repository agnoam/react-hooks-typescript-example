import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { ImageObj /*, searchImageByName */ } from "../../shared/httpService";
import Gallery from "react-photo-gallery";
import { RingLoader } from 'halogenium'; 
import InfiniteScroll from "react-infinite-scroller";
import SearchInput from "./SearchInput/SearchInput";
import Config from '../../../constants/config.json';
import ImageSelector from "./ImageSelector/ImageSelector";
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import StickyAppBar from "./HideOnScroll/StickyAppBar";
import configs from '../../../constants/config.json';

// @ts-ignore 
import Lightbox from "react-awesome-lightbox";

import './GalleryPage.scss';
import "react-awesome-lightbox/build/style.css";

/**
 * @description Moving to login page by react-router-dom
 * @param history History of `react-router-dom`
 */
export const moveToLoginPage = (history: any): void => {
    history.push('/login');
}

/**
 * @description Getting the credentials from browser's localStorage
 * @returns The credentials of the user if exists
 */
export const getCreds = (): Credentials => {
    try {
        // Stringified value from localStorage
        const strValue = localStorage.getItem(LocalStorageKeys.Credentials);
        return JSON.parse(strValue || '{}');
    } catch(ex) {
        console.error('getCreds ex', ex);
        return { username: '', password: '' };
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    banner: {
        background: `url(${configs.galleryPage.bannerURL})`,
        backgroundRepeat: 'no-repeat, repeat',
        height: '150px'
    },
    bannerSearch: {
        display: 'flex',
        justifyContent: 'center',
        margin: '125px'
    },
    title: {
      flexGrow: 1,
    }
  })
);

const GalleryPage = () => {
    /**
     * @description Handles the image search
     * @param e The `$event` from the onChange funciton of the input
     */
    function handleNameChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setState((state) => { 
            return { ...state, nameToSearch: e?.target.value || '' } 
        });
    }

    /**
     * @description The function handles the loading images process from the web service
     * 
     * @param startingIndex The index of the first image that will received (optional, used by InfiniteScroll)
     * @param batchSize The size of the chunk we will receive from the web service (optional)
     */
    const handleImagesLoad = async (startingIndex: number, batchSize: number = 30): Promise<void> => {
        if (state?.nameToSearch.length || (state?.nameToSearch.length && startingIndex > 0 && batchSize > 0)) {
            try {
                // const images: ImageObj[] = await searchImageByName(state.nameToSearch, startingIndex, batchSize);
                const images: ImageObj[] = [
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 720,
                        height: 1080
                    },
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 720,
                        height: 1080
                    },
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 1920,
                        height: 1080
                    },
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 1920,
                        height: 1080
                    },
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 1920,
                        height: 1080
                    },
                    {
                        originalURL: 'https://static.toiimg.com/photo/72975551.cms',
                        thumbnailURL: 'https://static.toiimg.com/photo/72975551.cms',
                        width: 1920,
                        height: 1080
                    }
                ]
                
                // Convert from ImageObj to PhotoItem
                if (images) {
                    const newItems: PhotoGallery[] = [];

                    for (const imageObj of images) {
                        const { width, height } = imageObj;
                        newItems.push({ src: imageObj.originalURL, width, height });
                    }
                    
                    setState((state: GalleryState) => {
                        return startingIndex > 0 && batchSize > 0 ? 
                            { ...state, items: state.items.concat(newItems), isDone: !newItems.length }    
                        :
                            { ...state, items: newItems, isDone: !newItems.length }
                    });
                }
            } catch(ex) {
                console.error(ex);
                // TODO: Check what error occurd and show appropriate error message
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
                <RingLoader size='35px' color='#26A65B' />
            </div>
        );
    }

    const logout = () => {
        localStorage.removeItem(LocalStorageKeys.Credentials);
        history.replace('/login');
    }

    const classes = useStyles();
    const history = useHistory();
        
    const [state, setState] = useState<GalleryState>({ 
        nameToSearch: '', viewPhoto: -1, items: [], 
        isDone: true, selectionMode: false, selectedImages: []
    });

    const imageRenderer = useCallback(({ index, left, top, key, photo }) => (
        <ImageSelector
            onOpened={(index: number) => {
                console.log('openning: ', index);
                setState({ ...state, viewPhoto: index });
            }}
            onSelected={() => console.log('selected')}
            selected={false}
            key={key}
            margin={"2px"}
            index={index}
            photo={photo}
            left={left}
            top={top} />
    ), []);

    const renderAppBar = () => {
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}<div></div>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Photos</Typography>
                    <SearchInput
                            initValue={state?.nameToSearch || ''}
                            onKeyDown={(e) => (e.code === 'Enter' || e.code as string === 'NumpadEnter') && handleImagesLoad(0) }
                            onChange={(e) => handleNameChange(e)} 
                            onClear={() => setState((state) => { return { ...state, items: [] } })} />
                    
                    <IconButton onClick={logout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    const renderBanner = () => {
        return (
            <AppBar color="transparent">
                    <Toolbar className={classes.banner}>
                        <SearchInput
                            className={classes.bannerSearch}
                            initValue={state?.nameToSearch || ''}
                            inputStyle={{ backgroundColor: "white" }}
                            onKeyDown={(e) => (e.code === 'Enter' || e.code as string === 'NumpadEnter') && handleImagesLoad(0) }
                            onChange={(e) => handleNameChange(e)} 
                            onClear={() => setState((state) => { return { ...state, items: [] } })} />
                    </Toolbar>
            </AppBar>
        );
    }

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    }, [history]);

    return (
        <div className="page-content">
            <StickyAppBar header={renderAppBar()}>
                { renderBanner() }
            </StickyAppBar>
            
            <div className="gallery-container">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => handleImagesLoad(state?.items.length, Config.galleryPage.infiniteScrollBatchSize)}
                    hasMore={!!state?.nameToSearch && !state?.isDone}
                    loader={renderLoader()}>
                    {
                        state?.items.length && state?.nameToSearch ?
                            <div>
                                { state?.viewPhoto >= 0 ?
                                    <Lightbox
                                        startIndex={state.viewPhoto}
                                        images={state.items.map((item) => item.src)}
                                        onClose={() => {
                                            setState((state) => { 
                                                return { ...state, viewPhoto: -1 } 
                                            });
                                        }} />
                                :
                                    <div></div> }

                                <Gallery
                                    photos={state?.items} 
                                    renderImage={/* state?.selectionMode ? */ imageRenderer/* : undefined */}
                                    onClick={(e, photos) => setState((state) => {
                                        console.log(photos.index);
                                        return { ...state, viewPhoto: photos.index }
                                    })}
                                />
                            </div>
                        :
                            <div></div>
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
}

interface GalleryState {
    nameToSearch: string;
    viewPhoto: number; // Image index in items 
    items: PhotoGallery[];
    isDone: boolean; // All images loaded

    selectionMode: boolean;
    selectedImages: string[];
}

export interface PhotoGallery {
    src: string;
    width: number;
    height: number;
    srcSet?: string | string[] | undefined;
    sizes?: string | string[] | undefined;
    alt?: string | undefined;
    key?: string | undefined;
    title?: string | undefined;
}

export default GalleryPage;