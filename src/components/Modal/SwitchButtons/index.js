import React, { useContext } from 'react';
import cn from 'classnames';

import s from './SwitchButtons.module.css';

import Button from '../../Button';

import { ModalContext } from '../../../context';

import { checkoutNews, getShiftValue } from '../utils';

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

    const direction = e.target.id;

    const isLastPart = currentPartIndex === lastPart;
    const isFirstPart = currentPartIndex === firstPart;
    const notFirstNews = currentNewsIndex !== firstPart;
    const isCheckoutNewsLeft = direction === 'left';

    if (
      isLastPart ||
      (isFirstPart && notFirstNews && isCheckoutNewsLeft)
    ) {
      checkoutNews(
        currentNewsIndex,
        newsIds,
        setCurrentNewsId,
        direction
      );
      setcurrentPartIndex(0);
      return;
    }

    const value = getShiftValue(direction);

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
