import React, { useContext, useState } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';
import Button from '../Button';
import { ModalContext } from '../../context';
import ProgressBar from '../ProgressBar';

//TODO: Блоки кнопок когда первая новость (левая) и последняя новость (правая)
//TODO: Прогресс бар и переключение частей новости и затем преерключение на следующую новость если часть последняя

const arrowButtons = ['left', 'right'];

const renderText = (newsPart, onClick) => {
  return newsPart.textList.map((elem, index) => {
    const classNamesTextContainer = (index) => {
      const key = `text${index}`;
      return cn(s[key]);
    };

    return (
      <div
        className={classNamesTextContainer(index)}
        key={elem.textId}
        onClick={onClick}
      >
        <p>{elem.text}</p>
      </div>
    );
  });
};

const renderButtons = (handleClick, currentPart, lastPart) => {
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

  console.log('RENDER MODal', currentPartIndex);

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
      const currentNewsIndex = newsIds.indexOf(currentNewsId);
      const nextNewsIndex = currentNewsIndex + value;

      setCurrentNewsId(newsIds[nextNewsIndex]);
      setcurrentPartIndex(0);

      console.log('Last psrt');
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
        {renderText(currenNewsPart, handleClickNewsLink)}
        {renderButtons(handleClickButton, currentPartIndex, lastPart)}
      </div>
    </div>
  );
};

export default Modal;
