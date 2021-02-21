import React, { useEffect, useState } from 'react';
import { Slide } from '@material-ui/core';

enum ScrollDirection {
    Up,
    Down
}

const StickyAppBar = (props: IHideOnScrollProps) => {
    const { header, children } = props;
    const changeIndex: number = props.changeIndex || 150;
    
    const [yPosition, setYPosition] = useState(0);
    const [lastYPos, setLastYPos] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>();
    
    const updateScrollPosition = () => {
        setLastYPos(yPosition);
        setYPosition(window.pageYOffset);
        setScrollDirection(lastYPos <= yPosition && lastYPos ? ScrollDirection.Down : ScrollDirection.Up);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScrollPosition);

        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener('scroll', updateScrollPosition);
        }
    });

    console.log('scrollDirection: ', scrollDirection);

    return (
        scrollDirection === ScrollDirection.Down ?
            (yPosition > changeIndex + 15) ?
                <Slide appear={true} direction="up" in={yPosition > changeIndex + 15}>
                    {header}
                </Slide>
            :
                <Slide appear={false} direction="up" in={yPosition <= changeIndex + 15}>
                    {children}
                </Slide>
        :
            // Scrolling up
            (yPosition < changeIndex) ?
                // Banner
                <Slide appear={false} direction="up" in={yPosition < changeIndex}>
                    {children}
                </Slide>
            :
                <Slide appear={true} direction="up" in={yPosition >= changeIndex}>
                    {header}
                </Slide>
    );
}

export default StickyAppBar;

interface IHideOnScrollProps {
    header: React.ReactElement; // Showing when Y is greater than `changeIndex`
    children: React.ReactElement; // The element shown on render (Y is lower than `changeIndex`)
    changeIndex?: number; // The Y index the child will change with the header
    className?: any; // 
}