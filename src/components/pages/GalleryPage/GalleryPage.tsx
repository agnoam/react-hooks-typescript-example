import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";
import { Input, InputLabel } from '@material-ui/core';
import { PhotoSwipeGallery, PhotoSwipeGalleryItem } from 'react-photoswipe';
import './GalleryPage.scss';
import 'react-photoswipe/lib/photoswipe.css';
import { LazyLoadImage } from "react-lazy-load-image-component";


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

function handleNameChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, 
    state: GalleryState | undefined, 
    setState: Dispatch<SetStateAction<GalleryState | undefined>>
): void {
    let _state: GalleryState = state as GalleryState;
    _state ? _state.nameToSearch = e.target.value : _state = new GalleryState(e.target.value, []);
    
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

const GalleryPage = () => {
    const history = useHistory();
    const [state, setState] = useState<GalleryState>();
    const items: PhotoSwipeGalleryItem[] = [
        {
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
        }
    ]

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    }, [history]);

    return (
        <div className="page-content">
            <p>GalleryPage</p>
            <div id="input-container">
                <InputLabel htmlFor="name-input"></InputLabel>
                <Input 
                    id="name-input"
                    autoFocus={true}
                    onChange={(e) => handleNameChange(e, state, setState)} />
            </div>
            
            <PhotoSwipeGallery isOpen={false} items={items} options={{}} thumbnailContent={getThumbnailContent} />
        </div>
    );
}

class GalleryState {
    nameToSearch: string;
    results: any[];

    constructor(nameToSearch: string, results: any[]) {
        this.nameToSearch = nameToSearch;
        this.results = results;
    }
}

export default GalleryPage;