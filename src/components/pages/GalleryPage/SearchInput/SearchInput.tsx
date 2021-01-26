import React from 'react';
import { Grow, Input, InputAdornment, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { useState } from 'react';

const SearchInput = (props: ISearchInputProps) => {
    const clearInput = (setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState((state: string) => '');
    }
    
    const [innerText, setInnerText] = useState('');

    return (
        <div id="input-container">
            <Grow in={true}>
                <Input 
                    id="name-input"
                    aria-label='searchbox'
                    data-test-id='name-searchbox'
                    placeholder="Search"
                    value={innerText}
                    autoFocus={true}
                    onKeyDown={props.onKeyDown}
                    onChange={async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { 
                        props.onChange(e);
                        setInnerText(() => e.target.value);
                    }}
                    startAdornment={
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton disabled={!innerText} onClick={() => {
                                clearInput(setInnerText);
                                props?.onClear && props.onClear();
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    } />
            </Grow>
        </div>
    );
}

export interface ISearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onClear?: () => void;
    onEnter?: () => void;
}


export default SearchInput;