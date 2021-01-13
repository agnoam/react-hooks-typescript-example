import axios, { AxiosResponse } from "axios";
import * as config from '../../constants/config.json';
import { LocalStorageKeys } from "../../constants/localStorage.keys";
import { ResponseStatus } from "../../constants/responseStatus";
import { Credentials } from "../pages/LoginPage/LoginPage";

export module HttpService {
    // export async function logIn(username: string, password: string): Promise<boolean> {
    //     try {
    //         const req: AxiosResponse = await axios.get(`${config.baseSite}/_api/Web/getusereffectivepermissions`, {
    //             headers: {
    //                 'Accept': 'application/json;odata=verbose'
    //             }
    //         });
            
    //         return true;
    //     } catch(ex) {
    //         console.error('LogIn ex:', ex);
    //         return false;
    //     }
    // }

    /**
     * @description Searching the images by name
     * 
     * @param name The name to search for 
     * @param numResults The number of results you want to get (max of 500)
     * 
     * @returns A json object with the found images
     */
    export async function searchImageByName(name: string, numResults?: number) {
        try {
            const credsStr = localStorage.getItem(LocalStorageKeys.Credentials);
            const creds: Credentials = JSON.parse(credsStr || '{}');

            const res: AxiosResponse = await axios.get(`${config.serverURL}/sharepoint-search`, {
                data: {
                    username: creds.username, 
                    password: creds.password,
                    QUERY: name,
                    numResults
                }
            });

            if (res.status === ResponseStatus.Ok)
                return res.data;
            throw Error(`searchImage http request ex:`);
        } catch(ex) {
            console.error('searchImage ex', ex);
        }
    }
}