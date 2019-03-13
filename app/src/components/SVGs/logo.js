import React from 'react';
// import LogoImg from '../../../public/images/logo.png';
import '../../../public/styles/headerContainer/logo.scss';

const Logo = () => {
    return (
        <div className='logo'>
            <img className='img' src='https://192.168.0.39:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/godrej-logo.png' alt='Logo' />
        </div>
    );
}

export default Logo;