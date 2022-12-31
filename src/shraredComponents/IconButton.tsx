import React from 'react';
import './IconButton.css';


interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: any
    children: React.ReactNode;
}
const IconButton: React.FunctionComponent<IconButtonProps> = (props) => {
    const classes = props.className ? `icon-button ${props.className}` : 'icon-button'

    return (
        <button {...props} className={classes}  ><span className='icon-button__icon'>{props.icon}</span>  <span className='icon-button__text'>{props.children}</span> </button>

    );
}

export default IconButton;
