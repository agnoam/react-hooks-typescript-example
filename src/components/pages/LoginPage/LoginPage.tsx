import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { verifyCredentials } from "../../shared/httpService";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@material-ui/icons";

import './LoginPage.scss';

const LoginPage = () => {
    const validateUsername = (username: string): boolean => {
        return !!username && username.length > 0;
    }
    
    const validatePassword = (password: string): boolean => {
        return password.length > 4;
    }
    
    const login = async (creds: Credentials, history: any): Promise<void> => {
        if (validateUsername(creds.username)) {
            if (validatePassword(creds.password)) {
                if (await verifyCredentials(creds)) {
                    localStorage.setItem(LocalStorageKeys.Credentials, JSON.stringify(creds));
                    history.push('/gallery');
                }
            } else {
                alert('Please check you password is correct');
            }
        } else {
            alert('Please check again your username');
        }
    }

    const history = useHistory();
    const defaultCreds: Credentials = { username: '', password: '' };
    const [creds, setCreds] = useState(defaultCreds);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return (
        <div className="page-container">
            <div id="login-card">
                <img src="https://icon-library.net//images/company-icon/company-icon-24.jpg" alt="" />
                <h3 className="title">Welcome</h3>

                <FormControl className="input-ctrl">    
                    <InputLabel htmlFor="username-input">Username</InputLabel>
                    <Input 
                        autoFocus
                        
                        id="username-input" 
                        aria-describedby="username-text-input" 
                        onChange={(e) => setCreds({ username: e.target.value as string, password: creds.password })}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            (creds.username.length && creds.password.length > 4 && e.code === 'Enter') && login(creds, history) 
                        }} />
                </FormControl>
                
                <br></br>
                <FormControl className="input-ctrl">
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <Input 
                        id="password-input" 
                        aria-describedby="password-text input"
                        type={!passwordVisibility ? 'password' : undefined}
                        endAdornment={
                            creds.password &&
                            <InputAdornment position='end'>
                                <IconButton className='visibility-button' onClick={() => setPasswordVisibility((visible) => !visible) }>
                                    {
                                        !passwordVisibility ?
                                            <VisibilityIcon />
                                        :
                                            <VisibilityOffIcon />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) => setCreds({ username: creds.username, password: e.target.value as string })}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            (creds.username.length && creds.password.length > 4 && e.code === 'Enter') && login(creds, history) 
                        }} />
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

export interface Credentials {
    username: string;
    password: string;
}

export default LoginPage;