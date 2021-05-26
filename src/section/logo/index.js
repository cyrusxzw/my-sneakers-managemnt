import React from 'react';
import './index.less';
import logoLink from '/img/logo.svg';


const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logoLink} alt="logo" />
        </div>
    )
}


export default Logo;