import React from "react";

const ImageSlide = ({ url }) => {
    const styles = {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  
    return (
      <img src={url}/>
    );
  }
  
  export default ImageSlide;