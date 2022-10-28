import React, { useContext } from 'react';
import cn from 'classnames';

import s from './SwitchButtons.module.css';

import Button from '../../Button';
import { ModalContext } from '../../../context';

const arrowButtons = ['left', 'right'];

const checkoutToNextNews = (
  currentNewsIndex,
  newsIds,
  setCurrentNewsId,
  direction = 'right'
) => {
  const shift = 1;
  const value = direction === 'right' ? shift : -shift;

  const nextNewsIndex = currentNewsIndex + value;

  setCurrentNewsId(newsIds[nextNewsIndex]);
};

const SwitchButtons = ({
  currentPartIndex,
  lastPart,
  setcurrentPartIndex,
}) => {
  const { newsPartsList, currentNewsId, newsIds, setCurrentNewsId } =
    useContext(ModalContext);

  const firstPart = 0;

  const disabledButton = currentPartIndex === firstPart;

  const currenNewsParts = newsPartsList.byId.filter(
    ({ newsId }) => newsId === currentNewsId
  );

  // const currenNewsPart = currenNewsParts[currentPartIndex];

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
          disabled={disabledButton && direction === 'left'}
        />
      </div>
    );
  });
};

export default SwitchButtons;
