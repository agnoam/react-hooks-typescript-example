import React, { useState, useEffect, useRef } from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
import { PhotoGallery } from '../GalleryPage';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

// Hook
function useHover() {
    const [value, setValue] = useState(false);
  
    const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
  
    useEffect(() => {
        const node = ref.current;
        if (node) {
          node.addEventListener('mouseover', handleMouseOver);
          node.addEventListener('mouseout', handleMouseOut);
  
          return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
          }
        }
      }, [ref.current]);  // Recall only if ref changes
  
    return [ref, value];
}

const useStyles = makeStyles({
    hiddenOverlay: {
        visibility: 'hidden'
    },
    overlay: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.48575512618296535) 0%, rgba(255,255,255,1) 100%, rgba(0,212,255,1) 100%);'
    }
});

const ImageSelector = (props: IImageSelectorProps) => {
    const classes = useStyles();
    const [isSelected, setIsSelected] = useState(props.selected);
    const photo = props.photo;

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsSelected(!isSelected);
    }

    useEffect(() => {
        setIsSelected(props.selected);
    }, [props.selected]);

    const [hoverRef, isHovered] = useHover();

    return (
        <div
            ref={(hoverRef as React.RefObject<HTMLDivElement>)}
            style={{ margin: props.margin, height: photo.height, width: photo.width } as React.CSSProperties }
            className={!isSelected ? "not-selected" : ""}>
            { 
                <div className={isHovered ? classes.overlay : classes.hiddenOverlay } ref={(hoverRef as React.RefObject<HTMLDivElement>)}>
                    <Checkbox 
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />}
                        checked={isSelected}
                        onClick={handleOnClick} />
                </div>
            }
            
            <img
                alt={photo?.title || ''}
                // style={ isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle } }
                width={photo.width}
                height={photo.height}
                src={photo.src}
                onClick={(e) => props.onOpened(props.index)} />
        </div>
    );
}

export default ImageSelector;

export interface IImageSelectorProps {
    onSelected: (photoIndex: number) => void; // Clicked on the checkbox
    onOpened: (photoIndex: number) => void; // Clicked on the image

    index: number;
    photo: PhotoGallery;
    margin: string;
    top: number;
    left: number;
    selected: boolean;
    direction?: string | "column";
}