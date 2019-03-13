import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
 
const GetImage = ({ src, alt }) => (
    <LazyLoadImage
        src={src}
        alt={alt}
    />
);
 
export default GetImage;