import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';
import Button from '../Button';
import { ModalContext } from '../../context';
import ProgressBar from './ProgressBar';
import NewsText from './NewsText';
import SwitchButtons from './SwitchButtons';

//TODO: Блоки кнопок когда первая новость (левая) и последняя новость (правая)
//TODO: Прогресс бар и переключение частей новости и затем преерключение на следующую новость если часть последняя

/* const renderButtons = (handleClick, currentPart, lastPart) => {
  const firstPart = 0;

  const disabledButton = currentPart === firstPart;

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
          onClick={handleClick}
          disabled={disabledButton && direction === 'left'}
        />
      </div>
    );
  });
}; */

const checkoutToNextNews = (
  currentNewsIndex,
  newsIds,
  shift,
  setCurrentNewsId,
  setcurrentPartIndex,
  direction = 'right'
) => {
  const value = direction === 'right' ? shift : -shift;

  const nextNewsIndex = currentNewsIndex + value;

  setCurrentNewsId(newsIds[nextNewsIndex]);
  setcurrentPartIndex(0);
};

const Modal = ({ isOpen, onClosed }) => {
  const [currentPartIndex, setcurrentPartIndex] = useState(0);

  const { newsPartsList, currentNewsId, newsIds, setCurrentNewsId } =
    useContext(ModalContext);

  const currenNewsParts = newsPartsList.byId.filter(
    ({ newsId }) => newsId === currentNewsId
  );

  const currenNewsPart = currenNewsParts[currentPartIndex];

  const lastPart = currenNewsParts.length - 1;

  const currentNewsIndex = newsIds.indexOf(currentNewsId);

  console.log('RENDER MODal', currentPartIndex);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currentPartIndex === lastPart) {
        const shift = 1;
        checkoutToNextNews(
          currentNewsIndex,
          newsIds,
          shift,
          setCurrentNewsId,
          setcurrentPartIndex
        );
        return;
      }

      setcurrentPartIndex((prevState) => prevState + 1);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentPartIndex]);

  const handleClickNewsLink = (e) => {
    e.stopPropagation();
    console.log('Click on link news');
  };

  const handleClickButton = (e) => {
    e.stopPropagation();
    console.log('handleClick', currentPartIndex, lastPart);

    const direction = e.target.id;

    const shift = 1;

    const value = direction === 'right' ? shift : -shift;

    if (currentPartIndex === lastPart) {
      checkoutToNextNews(
        currentNewsIndex,
        newsIds,
        shift,
        setCurrentNewsId,
        setcurrentPartIndex,
        direction
      );
      return;
    }

    setcurrentPartIndex((prevState) => prevState + value);
  };

  return (
    <div className={s.modalBlanket} onClick={onClosed}>
      <div className={s.modal}>
        <ProgressBar
          newsParts={currenNewsParts}
          active={currenNewsPart.id}
        />
        <NewsText
          textList={currenNewsPart.textList}
          onClick={handleClickNewsLink}
        />
        <SwitchButtons
          onClick={handleClickButton}
          currentPartIndex={currentPartIndex}
          lastPart={lastPart}
        />
      </div>
    </div>
  );
};

export default Modal;
