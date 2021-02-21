import React, { useState } from "react";
import { Checkbox, makeStyles, Theme } from "@material-ui/core";
import { PhotoGallery } from '../GalleryPage';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import { grey, green } from '@material-ui/core/colors';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles<Theme, IImageSelectorProps>({
    hiddenOverlay: {
        visibility: 'hidden'
    },
    overlay: {
        marginBottom: '50px',
        width: (props) => `${props.photo.width}px`,
        height: (props) => `${props.photo.height}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: (props) => `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 20%), url(${props.photo.src});`,
        display: 'flex'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'start',
        height: '25px'
    }
});

const ImageSelector = (props: IImageSelectorProps) => {
    const classes = useStyles(props);
    const [isHovered, setIsHovered] = useState(!!props.selectionMode);
    const [isSelected, setIsSelected] = useState(props.selected);
    const photo = props.photo;

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevents event-bubbling
        e.isDefaultPrevented() && e.preventDefault();
        e.stopPropagation(); 
        
        setIsSelected(!isSelected);
        props.onSelected({ photoIndex: props.index, selected: !isSelected });
    }

    // useEffect(() => {
    //     setIsSelected(props.selected);
    // }, [props.selected]);

    console.log('selectionMode: ', props.selectionMode)

    return (
        <div
            onMouseEnter={(e) => !props.selectionMode && setIsHovered(isHovered => !isHovered)}
            onMouseLeave={(e) => !props.selectionMode && setIsHovered(isHovered => !isHovered)}
            style={{ margin: props.margin, height: photo.height, width: photo.width } as React.CSSProperties }
            className={!isSelected ? "not-selected" : ""}>
            {
                props.selectionMode || isHovered || isSelected ?
                    <div 
                        className={classes.overlay}
                        onClick={() => props.onOpened(props.index)}>
                        <Checkbox 
                            className={classes.checkbox}
                            icon={<CircleUnchecked style={{ color: grey[500] }} />}
                            checkedIcon={<CircleChecked style={{ color: green[500] }} />}
                            checked={isSelected}
                            onClick={(e) => handleOnClick(e)} />
                    </div>
                :
                    <img
                        className={isHovered ? classes.hiddenOverlay : ''}
                        alt={photo?.title || ''}
                        width={photo.width}
                        height={photo.height}
                        src={photo.src} />
            }
        </div>
    );
}

export default ImageSelector;

export interface IImageSelectorProps {
    onOpened: (photoIndex: number) => void; // Clicked on the image
    onSelected: (data: { photoIndex: number, selected: boolean }) => void; // Clicked on the checkbox

    index: number;
    photo: PhotoGallery;
    margin: string;
    top: number;
    left: number;
    selected: boolean;
    direction?: string | "column";

    selectionMode?: boolean; // If true, `onHover` will be always true
}

export interface SelectionData {
    photoIndex: number;
    selected: boolean;
}