import React, { useEffect, useState } from 'react';
import { Slide } from '@material-ui/core';

const StickyAppBar = (props: IHideOnScrollProps) => {
    const { header, children } = props;
    const [yPosition, setYPosition] = useState(0);
    const updateScrollPosition = () => setYPosition((pos) => window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', updateScrollPosition);

        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener('scroll', updateScrollPosition);
        }
    }, []);

    console.log('yPosition', yPosition);

    return (
            yPosition >= 100 ?
                <Slide appear={true} direction="up" in={yPosition >= 100}>
                    {header}
                </Slide>
            :
                <Slide appear={false} direction="down" in={yPosition < 100}>
                    {children}
                </Slide>
    );
}

export default StickyAppBar;

interface IHideOnScrollProps {
    header: React.ReactElement;
    children: React.ReactElement;
    className?: any;
}