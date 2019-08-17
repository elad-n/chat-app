import React from 'react';

const Header = ({ headerText, classes }) => (
    <div className={`main-header ${classes}`} >{headerText}</div>
);

export default Header;