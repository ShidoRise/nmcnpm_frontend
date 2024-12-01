import React from 'react';
import './ButtonMenu.css';
import {Link} from 'react-router-dom';

// Button homepage
const STYLES = ['btn--back', 'btn--cart']
const SIZES = ['btn--mini', 'btn--large']

export const ButtonMenu = (
    {
        children,
        type,
        onClick,
        buttonStyle,
        buttonSize,
        to = '/sign-up'
    }
) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={to}>
            <button className={`${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
            {children}
         </button>
        </Link>
    )
};