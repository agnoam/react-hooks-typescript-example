import React from 'react';
import { Grow, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { useState } from 'react';
import classnames from 'classnames';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const SearchInput = (props: ISearchInputProps) => {
    const [innerText, setInnerText] = useState(props?.initValue || '');

    const clearInput = () => setInnerText((state: string) => '');
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInnerText((innerText: string) => {
            let _innerText: string = innerText;
            if (_innerText[0] === ' ') 
                _innerText = '';
            
            return _innerText.trimStart();
        });
        props?.onKeyDown && props.onKeyDown(e);
    }
    
    return (
        <div id="input-container" className={classnames('search-input', props.className)}>
            <Grow in={true}>
                <TextField 
                    id="name-input"
                    aria-label='searchbox'
                    data-test-id='name-searchbox'
                    variant="filled"
                    placeholder="Search"
                    value={innerText}
                    autoFocus={true}
                    style={props.inputStyle}
                    onChange={async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { 
                        props.onChange(e);
                        setInnerText(() => e.target.value);
                    }}
                    InputProps={{
                        onKeyDown: onKeyDownHandler,
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton 
                                    disabled={!innerText} 
                                    onClick={() => {
                                        clearInput();
                                        props?.onClear && props.onClear();
                                    }}>
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
            </Grow>
        </div>
    );
}

export interface ISearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClear?: () => void;
    onEnter?: () => void;
    className?: any;
    inputStyle?: CSSProperties;
    initValue?: string;
}


export default SearchInput;