import React from 'react';

import s from './Button.module.css';

const Button = ({ id, onClick, disable }) => {
  return (
    <button
      className={s.button}
      disable={disable}
      id={id}
      onClick={onClick}
    ></button>
  );
};

export default Button;
