import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "@material-ui/core";
import { PhotoGallery } from '../GalleryPage';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

// Hook
function useHover() {
    const [value, setValue] = useState(false);
  
    const ref: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  
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

const SelectedImage = (props: ISelectedImageProps) => {
    const [isSelected, setIsSelected] = useState(props.selected);
    const photo = props.photo;

    const handleOnClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        setIsSelected(!isSelected);
    }

    useEffect(() => {
        setIsSelected(props.selected);
    }, [props.selected]);

    const [hoverRef, isHovered] = useHover();

    return (
        <div
            ref={hoverRef}
            style={{ margin: props.margin, height: photo.height, width: photo.width } as React.CSSProperties }
            className={!isSelected ? "not-selected" : ""}>
            
            { 
                isHovered &&
                    <Checkbox 
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />} />
            }
            
            <img
                alt={photo?.title || ''}
                // style={ isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle } }
                width={photo.width}
                height={photo.height}
                src={photo.src}
                //  onClick={(e) => handleOnClick(e)}
            />
            <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
        </div>
    );
}

export default SelectedImage;

export interface ISelectedImageProps {
    onSelected: () => void; // Clicked on the checkbox
    onOpened: () => void; // Clicked on the image

    index: number;
    photo: PhotoGallery;
    margin: string;
    top: number;
    left: number;
    selected: boolean;
    direction?: string | "column";
}