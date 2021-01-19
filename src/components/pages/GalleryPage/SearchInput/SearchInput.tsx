import React from 'react';
import { Grow, Input, InputAdornment, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { useState } from 'react';

const clearInput = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState((state: string) => '');
}

const SearchInput = (props: ISearchInputProps) => {
    const [innerText, setInnerText] = useState('');

    return (
        <div id="input-container">
            {/* <InputLabel htmlFor="name-input"></InputLabel> */}
            <Grow in={true}>
                <Input 
                    id="name-input"
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
                            <IconButton disabled={!innerText} onClick={() => clearInput(setInnerText)}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    } />
            </Grow>
        </div>
    );
}

export interface ISearchInputProps {
    onKeyDown?: (e: any) => void;
    onChange: (e: any) => void;
}


export default SearchInput;