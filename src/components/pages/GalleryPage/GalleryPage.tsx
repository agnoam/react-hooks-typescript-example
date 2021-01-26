import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { ImageObj, searchImageByName } from "../../shared/httpService";
import Gallery from "react-photo-gallery";
import { RingLoader } from 'halogenium'; 
import InfiniteScroll from "react-infinite-scroller";
import SearchInput from "./SearchInput/SearchInput";
import Config from '../../../constants/config.json';
import SelectedImage from "./SelectedImage/SelectedImage";
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

// @ts-ignore 
import Lightbox from "react-awesome-lightbox";

import './GalleryPage.scss';
import "react-awesome-lightbox/build/style.css";
import { AppBar, createStyles, FormControlLabel, IconButton, makeStyles, Menu, MenuItem, Theme, Toolbar, Typography } from "@material-ui/core";

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

    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState<GalleryState>({ nameToSearch: '', viewPhoto: -1, items: [], isDone: true });
    const [selectAll, setSelectAll] = useState(false); // TODO: Remove select all
    
    // TODO: REMOVE
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const imageRenderer = useCallback(({ index, left, top, key, photo }) => (
        <SelectedImage
            selected={selectAll}
            key={key}
            margin={"2px"}
            index={index}
            photo={photo}
            left={left}
            top={top} />
    ), [selectAll]);

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    }, [history]);

    return (
        <div className="page-content">
            {/* TODO: Add appbar, multi select mode, logout button, download */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}<div></div>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Photos</Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={!!anchorEl}
                            onClose={() => handleClose()}>
                            <MenuItem onClick={() => handleClose()}>
                                {/* <FormControlLabel
                                    control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                    label="Multi selection mode" /> */}
                            </MenuItem>
                            <MenuItem onClick={() => handleClose()}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            
            <SearchInput
                onKeyDown={(e) => (e.code === 'Enter' || e.code as string === 'NumpadEnter') && handleImagesLoad(0) }
                onChange={(e) => handleNameChange(e)} 
                onClear={() => setState((state) => { return { ...state, items: [] } })} />
            
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
                                    renderImage={imageRenderer}
                                    onClick={(e, photos) => setState((state) => {
                                        console.log(photos.index);
                                        return { ...state, viewPhoto: photos.index }
                                    })}
                                />
                            </div>
                        :
                            <p className='nothing-to-show-subtitle'>There is nothing to show</p>
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