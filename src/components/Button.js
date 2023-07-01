
import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];//3.

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({ //1.
  children, //2.
  type,
  onClick,
  buttonStyle,
  buttonSize,
  to
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) //4.
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to='/comp' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`} //.5
        onClick={onClick}
        type={type}
      >
        {children} 
      </button>
    </Link>
  );
};


//1. just like export const Button you can create here many other classes
//2. We destructuring the props to directly use it
//3. We are creating array to later assign default value for props
//4. We are checking whether we received something and then assigning a default value
//5. classnmae provides css styling, here in this case its dynamic prop specific
//6. Children basically the text on button
