import React, { useState, useEffect } from "react";
import { PhotoGallery } from '../GalleryPage';

const Checkmark = (props: { selected: boolean, onVClicked: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void }) => {
    return (
        <div
            style={
                (props.selected ? 
                    { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
                : 
                    { display: "none" }) as React.CSSProperties
            }>
                <svg
                    onClick={props.onVClicked}
                    style={{ fill: "white", position: "absolute" }}
                    width="24px"
                    height="24px">
                    <circle cx="12.5" cy="12.2" r="8.292" />
                </svg>
                <svg
                    style={{ fill: "#06befa", position: "absolute" }}
                    width="24px"
                    height="24px">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
        </div>
    );
}

const imgStyle = { 
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s" 
}

const selectedImgStyle = {
    transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
}

const cont: Conture = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
}

const SelectedImage = (props: ISelectedImageProps) => {
  const [isSelected, setIsSelected] = useState(props.selected);
  const photo = props.photo;

  // Calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (props.direction === "column") {
    cont.position = "absolute";
    cont.left = props.left;
    cont.top = props.top;
  }

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsSelected(!isSelected);
  }

  useEffect(() => {
    setIsSelected(props.selected);
  }, [props.selected]);

  return (
    <div
      style={{ margin: props.margin, height: photo.height, width: photo.width, ...cont } as React.CSSProperties }
      className={!isSelected ? "not-selected" : ""}>

        {/* <Checkmark selected={isSelected} onVClicked={(e) => handleOnClick(e)} /> */}
        <img
            alt={photo?.title || ''}
            style={ isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle } }
            width={photo.width}
            height={photo.height}
            src={photo.src}
            //  onClick={(e) => handleOnClick(e)}
        />
        <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </div>
  );
};

export default SelectedImage;

export interface ISelectedImageProps {
    index: number;
    photo: PhotoGallery;
    margin: string;
    top: number;
    left: number;
    selected: boolean;
    direction?: string | "column";
}

interface Conture {
    backgroundColor: string;
    cursor: string;
    overflow: string;
    position: string;
    top?: number;
    left?: number; 
}