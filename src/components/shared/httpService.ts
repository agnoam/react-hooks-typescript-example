import axios, { AxiosResponse } from "axios";
import * as config from '../../constants/config.json';
import { LocalStorageKeys } from "../../constants/localStorage.keys";
import { ResponseStatus } from "../../constants/responseStatus";
import { Credentials } from "../pages/LoginPage/LoginPage";

/**
 * @description Searching the images by name
 * 
 * @param name The name to search for 
 * @param numResults The number of results you want to get (max of 500)
 * 
 * @returns A json object with the found images
 */
export const searchImageByName = async (name: string, numResults?: number): Promise<ImageObj[] | undefined> => {
    try {
        const credsStr = localStorage.getItem(LocalStorageKeys.Credentials);
        const creds: Credentials = JSON.parse(credsStr || '{}');

        const res: AxiosResponse = await axios.get(`${config.serverURL}/sharepoint-search`, {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                username: creds.username, 
                password: creds.password,
                QUERY: name,
                numResults
            }
        });

        if (res.status == ResponseStatus.Ok)
            return res.data as ImageObj[];
        throw Error(`searchImage http request ex:`);
    } catch(ex) {
        console.error('searchImage ex', ex);
    }
}

export interface ImageObj {
    width: number;
    height: number;
    thumbnailURL: string;
    originalURL: string;
}
