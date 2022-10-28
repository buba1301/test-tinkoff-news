import React from 'react';
import cn from 'classnames';

import s from './SwitchButtons.module.css';

import Button from '../../Button';

const arrowButtons = ['left', 'right'];

const SwitchButtons = ({ onClick, currentPartIndex, lastPart }) => {
  const firstPart = 0;

  const disabledButton = currentPartIndex === firstPart;

  return arrowButtons.map((direction) => {
    const classNamesButtonsArrow = cn(
      s.newsButtonArrows,
      s[direction]
    );

    return (
      <div
        className={classNamesButtonsArrow}
        key={direction}
        id={direction}
      >
        <Button
          id={direction}
          onClick={onClick}
          disabled={disabledButton && direction === 'left'}
        />
      </div>
    );
  });
};

export default SwitchButtons;
