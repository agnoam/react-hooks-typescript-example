import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from "../../../constants/localStorage.keys";
import { FormControl, InputLabel, Input, Button, Snackbar, Slide } from '@material-ui/core';
import { verifyCredentials } from "../../shared/httpService";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@material-ui/icons";
import { Alert } from '@material-ui/lab';

import './LoginPage.scss';
import { TransitionProps } from "@material-ui/core/transitions";

const LoginPage = () => {
    const validateUsername = (username: string): boolean => {
        const validated: boolean = !!username && username.length > 0;
        setFormValidation((formValidation: Validation) => { return { ...formValidation, username: validated } });
        return validated;
    }
    
    const validatePassword = (password: string): boolean => {
        const validated: boolean = password.length > 4;
        setFormValidation((formValidation: Validation) => { return { ...formValidation, password: validated } });
        return validated;
    }
    
    const login = async (creds: Credentials, history: any): Promise<void> => {
        try {
            if (validateUsername(creds.username)) {
                if (validatePassword(creds.password)) {
                    if (await verifyCredentials(creds)) {
                        localStorage.setItem(LocalStorageKeys.Credentials, JSON.stringify(creds));
                        history.push('/gallery');
                    } else {
                        setFormValidation((formValidation: Validation) => { return { password: false, username: false } });
                        setLoginFailedTitle('This username or password is not correct');
                    }
                } else {
                    setFormValidation((formValidation: Validation) => { return { ...formValidation, password: false } });
                    setLoginFailedTitle('This password is not valid');
                }
            } else {
                setFormValidation((formValidation: Validation) => { return { ...formValidation, username: false } });
                setLoginFailedTitle('This Username is not valid');
            }
        } catch(ex) {
            setFormValidation((formValidation: Validation) => { return { password: false, username: false } });
            setLoginFailedTitle('Cannot sign in currently, Please try again later');
        }
    }

    const history = useHistory();
    const defaultCreds: Credentials = { username: '', password: '' };
    
    const [creds, setCreds] = useState(defaultCreds);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [formValidation, setFormValidation] = useState({ username: false, password: false });
    const [loginFailedTitle, setLoginFailedTitle] = useState('');

    return (
        <div className="page-container" data-testid="login-page">
            {
                // loginFailed ?
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={!!loginFailedTitle}
                        onClose={() => setLoginFailedTitle((state) => '')}
                        key={'top center'}
                        TransitionComponent={(props: TransitionProps) => {
                            return <Slide {...props} direction="up" />;
                        }}>
                            <Alert /* variant="outlined" */ severity="error" >{loginFailedTitle}</Alert>
                        </Snackbar>
                // :
                //     <div></div>
            }
            <div id="login-card">
                <img src="https://icon-library.net//images/company-icon/company-icon-24.jpg" alt="" />
                <h3 className="title">Welcome</h3>

                <FormControl className="input-ctrl" error={formValidation.username}>    
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
                <FormControl className="input-ctrl" error={formValidation.password}>
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

interface Validation {
    username: boolean;
    password: boolean;
}

export interface Credentials {
    username: string;
    password: string;
}

export default LoginPage;