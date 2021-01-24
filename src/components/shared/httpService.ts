import axios, { AxiosResponse } from "axios";
import * as config from '../../constants/config.json';
import { LocalStorageKeys } from "../../constants/localStorage.keys";
import { ResponseStatus } from "../../constants/responseStatus";
import { Credentials } from "../pages/LoginPage/LoginPage";

/**
 * @description Searching the images by name
 * 
 * @param name The name to search for 
 * @param startingPoint The first image index from db
 * @param batchSize The quantity of the images
 * 
 * @returns A json object with the found images
 */
export const searchImageByName = async (name: string, startingPoint?: number, batchSize?: number): Promise<ImageObj[] | undefined> => {
    try {
        const credsStr = localStorage.getItem(LocalStorageKeys.Credentials);
        const creds: Credentials = JSON.parse(credsStr || '{}');

        const res: AxiosResponse = await axios.get(`${config.serverURL}/sharepoint-search/`, {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                QUERY: name,
                username: creds.username, 
                password: creds.password,
                startingPoint, 
                batchSize
            }
        });

        if (res.status === ResponseStatus.Ok)
            return res.data as ImageObj[];
        throw Error(`searchImage http request ex:`);
    } catch(ex) {
        console.error('searchImageByName ex', ex);
    }
}

/**
 * @description Verifing that the username and password is correct
 * @param creds The user credentials 
 * @returns The verification status (true/false)
 */
export const verifyCredentials = async (creds: Credentials): Promise<boolean> => {
    try {
        const res: AxiosResponse = await axios.post(`${config.serverURL}/api/ver-login/`, {
            username: creds.username, 
            password: creds.password
        }, { headers: { 'Accept': 'application/json' } });

        if (res.status === ResponseStatus.Ok)
            return res.data.success;
        else
            return false;
    } catch(ex) {
        console.error('verifyCredentials ex', ex);
        return false;
    }
}

export interface ImageObj {
    width: number;
    height: number;
    thumbnailURL: string;
    originalURL: string;
}
