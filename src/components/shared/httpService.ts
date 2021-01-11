import axios, { AxiosResponse } from "axios";
import * as config from '../../constants/config.json';

export module HttpService {
    export async function LogIn(username: string, password: string): Promise<boolean> {
        try {
            const req: AxiosResponse = await axios.get(`${config.baseSite}/_api/Web/getusereffectivepermissions`, {
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            });
            
            return true;
        } catch(ex) {
            console.error('LogIn ex:', ex);
            return false;
        }
    }
}