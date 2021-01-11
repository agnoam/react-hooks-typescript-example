import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

const LoginPage = () => {
    const history = useHistory();
    const defaultCreds: Credentials = { username: '', password: '' };
    const [creds, setCreds] = useState(defaultCreds);

    return (
        <div>
            <p>LoginPage</p>
            <FormControl>    
                <InputLabel htmlFor="username-input">Username</InputLabel>
                <Input 
                    id="username-input" 
                    aria-describedby="username-text-input" 
                    onChange={(e) => setCreds({ username: e.target.value as string, password: creds.password })} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input 
                    id="password-input" 
                    aria-describedby="password-text input"
                    onChange={(e) => setCreds({ username: creds.username, password: e.target.value as string })} />
            </FormControl>
            <Button disabled={!creds.username.length || !creds.password.length} onClick={() => login(creds, history)}>Login</Button>
        </div>
    );
}

const validateUsername = (username: string): boolean => {
    return !!username && username.length > 0;
}

const validatePassword = (password: string): boolean => {
    return password.length > 4;
}

const login = (creds: Credentials, history: any): void => {
    if (validateUsername(creds.username)) {
        if (validatePassword(creds.password)) {
            localStorage.setItem(LocalStorageKeys.Credentials, JSON.stringify(creds));
            history.push('/gallery');
        } else {
            alert('Please check you password is correct');
        }
    } else {
        alert('Please check again your username');
    }
}

export interface Credentials {
    username: string;
    password: string;
}

export default LoginPage;