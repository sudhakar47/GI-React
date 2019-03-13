import React from 'react';
import image from '../../../public/images/search.png';

const socialIcon = (props) => {
    const socialHtml = props.name.map((item, index) => {
    return (
        <li key={index}><a href={item.action} ><img src={item.src} alt={item.alt}/></a></li>
    );
    })
    return socialHtml;
};

export default socialIcon;