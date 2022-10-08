import React from 'react';

import s from './Button.module.css';

const Button = ({ id, onClick, disabled }) => {
  return (
    <button
      className={s.button}
      disabled={disabled}
      id={id}
      onClick={onClick}
    ></button>
  );
};

export default Button;
