import React, { useContext } from 'react';
import cn from 'classnames';

import s from './SwitchButtons.module.css';

import Button from '../../Button';

import { ModalContext } from '../../../context';

import checkoutToNextNews from '../utils';

const arrowButtons = ['left', 'right'];

const SwitchButtons = ({
  currentPartIndex,
  lastPart,
  setcurrentPartIndex,
}) => {
  const { currentNewsId, newsIds, setCurrentNewsId } =
    useContext(ModalContext);

  const firstPart = 0;

  const currentNewsIndex = newsIds.indexOf(currentNewsId);

  const handleClickButton = (e) => {
    e.stopPropagation();
    console.log('handleClick');

    const direction = e.target.id;

    if (currentPartIndex === lastPart) {
      checkoutToNextNews(
        currentNewsIndex,
        newsIds,
        setCurrentNewsId,
        direction
      );
      setcurrentPartIndex(0);
      return;
    }

    const shift = 1;

    const value = direction === 'right' ? shift : -shift;

    setcurrentPartIndex((prevState) => prevState + value);
  };

  const disabledLeftBtn =
    currentPartIndex === firstPart && currentNewsIndex === 0;

  const disabledRightBtn =
    currentPartIndex === lastPart &&
    currentNewsIndex === newsIds.length - 1;

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
          onClick={handleClickButton}
          disabled={
            direction === 'left' ? disabledLeftBtn : disabledRightBtn
          }
        />
      </div>
    );
  });
};

export default SwitchButtons;
