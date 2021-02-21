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
import { ExitToApp as ExitToAppIcon, GetApp as GetAppIcon, Close as CloseIcon } from '@material-ui/icons';
import { AppBar, Box, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import StickyAppBar from "./HideOnScroll/StickyAppBar";
import configs from '../../../constants/config.json';
import axios from "axios";

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
    //   marginRight: theme.spacing(2),
    },
    banner: {
        background: `url(${configs.galleryPage.bannerURL})`,
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'cover',
        height: '150px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerSearch: {
        display: 'flex',
        justifyContent: 'center',
        margin: '125px'
    },
    title: {
      flexGrow: 1
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
        isDone: true, selectedImages: []
    });


    const handlePhotoSelection = useCallback((data: { photoIndex: number, selected: boolean }) => {
        console.log('handlePhotoSelection execute', data);

        const selectedImages: number[] = state?.selectedImages || [];
        if (data.selected) {
            selectedImages.push(data.photoIndex);
        } else {
            const startIndex: number = selectedImages.indexOf(data.photoIndex);
            selectedImages.splice(startIndex, 1);
        }

        setState((state) => { return {...state, selectedImages, items: state?.selectedImages.length >= 3 ? [] : state?.items} });
    }, [state, setState]);

    const imageRenderer = useCallback(({ index, left, top, key, photo }) => (
        <ImageSelector
            onOpened={(index: number) => {
                console.log('openning: ', index);
                setState((state) => { return { ...state, viewPhoto: index } });
            }}
            onSelected={handlePhotoSelection}
            selectionMode={(!!((state as GalleryState)?.selectedImages.length))}

            selected={!!state?.selectedImages.includes(index) || false}
            key={key}
            margin={"2px"}
            index={index}
            photo={photo}
            left={left}
            top={top} />
    ), [handlePhotoSelection, state]);

    const downloadFiles = (selectedIndexes: number[]) => {
        for (const index of selectedIndexes) {
            const anchor: HTMLAnchorElement = document.createElement('a');
            // anchor.href = state?.items[index].src;
            anchor.download = state?.items[index].src;

            anchor.click();
        }
    }
    
    const renderSelectedAppBar = () => {
        const imagesCount: number = state?.selectedImages.length;
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton 
                        className={classes.menuButton} 
                        color="inherit" 
                        edge="start" 
                        onClick={() => setState((state) => { return { ...state, selectedImages: [] } })}>
                            <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{imagesCount} Selected</Typography>
                    <IconButton onClick={() => null} color="inherit">
                        <GetAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    const renderAppBar = () => {
        const imagesCount: number = state?.selectedImages.length;
        if (imagesCount) 
            return renderSelectedAppBar();

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
                    
                    <IconButton onClick={() => logout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    const clearSearchBox = () => {
        console.log('searchInput cleared'); 
        setState((state) => { return { ...state, items: [] } });
    }

    const renderBanner = () => {
        return (
            <div>
                <AppBar color="transparent" className={classes.banner}>
                    <Box height='150px'>
                        <Toolbar>
                            <SearchInput
                                className={classes.bannerSearch}
                                initValue={state?.nameToSearch || ''}
                                inputStyle={{ backgroundColor: "white" }}
                                onKeyDown={(e) => (e.code === 'Enter' || e.code as string === 'NumpadEnter') && handleImagesLoad(0) }
                                onChange={(e) => handleNameChange(e)} 
                                onClear={clearSearchBox} />
                        </Toolbar>
                    </Box>
                </AppBar>
                
                <div className='pusher'></div>
            </div>
        );
    }

    const downloadFile = async (url: string, filename: string): Promise<void> => {
        try {
            const response = await axios({
                url, 
                method: 'GET',
                headers: { 'Origin': 'http://localhost:3000' },
                responseType: 'blob'
            });
    
            const blobURL: string = window.URL.createObjectURL(new Blob([response.data]));
            const link: HTMLAnchorElement = document.createElement('a');
            
            link.href = blobURL;
            link.setAttribute('download', filename);
            
            document.body.appendChild(link);
            link.click();
        } catch(ex) {
            console.error('downloadFile ex: ', ex);
        }
    }

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    }, [history]);

    return (
        <div className="page-content">
            <StickyAppBar header={renderAppBar()}>
                { state?.selectedImages.length ? renderSelectedAppBar() : renderBanner() }
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

                                <Button onClick={() => downloadFile('https://files.geektime.co.il/wp-content/uploads/2020/11/new-google-photos-logo-1604824480.jpg', 'new-google-photos-logo-1604824480.jpg')}>Download</Button>
                                <Gallery
                                    photos={state?.items} 
                                    renderImage={imageRenderer} />
                            </div>
                        :
                            <div>There is no images</div>
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
    selectedImages: number[]; // All selected photo IDs
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