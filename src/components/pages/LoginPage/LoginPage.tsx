import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import './LoginPage.scss';

const LoginPage = () => {
    const history = useHistory();
    const defaultCreds: Credentials = { username: '', password: '' };
    const [creds, setCreds] = useState(defaultCreds);

    return (
        <div className="page-container">
            <div id="login-card">
                <img src="https://icon-library.net//images/company-icon/company-icon-24.jpg" alt="" />
                <h3 className="title">Welcome</h3>

                <FormControl className="input-ctrl">    
                    <InputLabel htmlFor="username-input">Username</InputLabel>
                    <Input 
                        id="username-input" 
                        aria-describedby="username-text-input" 
                        onChange={(e) => setCreds({ username: e.target.value as string, password: creds.password })} />
                </FormControl>
                
                <br></br>
                <FormControl className="input-ctrl">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <Input 
                        id="password-input" 
                        aria-describedby="password-text input"
                        onChange={(e) => setCreds({ username: creds.username, password: e.target.value as string })} />
                </FormControl>
                
                <br></br>
                <Button 
                    variant="contained"
                    color="primary"
                    disabled={!creds.username.length || creds.password.length <= 4} 
                    onClick={() => login(creds, history)}>
                        Login
                </Button>
            </div>
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