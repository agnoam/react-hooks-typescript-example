import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { Credentials } from "../LoginPage/LoginPage";

const moveToLoginPage = (history: any) => {
    history.push('/login');
}

const getCreds = (): Credentials => {
    // Stringified value from localStorage
    const strValue = localStorage.getItem(LocalStorageKeys.Credentials);
    console.log('value from localStorage:', strValue);
    return JSON.parse(strValue || '{}');
}

const GalleryPage = () => {
    const history = useHistory();

    // Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        const creds: Credentials = getCreds();
        if (!creds || !creds.username || !creds.password) moveToLoginPage(history);
    });

    return (
        <p>GalleryPage</p>
    );
}

export default GalleryPage;