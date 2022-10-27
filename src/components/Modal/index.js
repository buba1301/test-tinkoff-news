import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import s from './Modal.module.css';
import Button from '../Button';
import { ModalContext } from '../../context';

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
  const [currentPart, setCurrentPart] = useState(0);

  const { newsPartsList, currentNewsId } = useContext(ModalContext);

  console.log('RENDER MODal', currentPart);

  const lastPart = newsPartsList.length - 1;

  const currenNewsParts = newsPartsList.filter(
    ({ newsId }) => newsId === currentNewsId
  );

  const handleClickNewsLink = (e) => {
    e.stopPropagation();
    console.log('Click on link news');
  };

  const handleClickButton = (e) => {
    e.stopPropagation();
    // console.log('REF', ref.current.nextElementSibling.id);
    console.log('handleClick', currentPart);
    const direction = e.target.id;

    const shift = 1;

    const value = direction === 'right' ? shift : -shift;
    setCurrentPart((prevState) => prevState + value);
  };

  return (
    <div className={s.modalBlanket} onClick={onClosed}>
      <div className={s.modal}>
        {renderText(
          currenNewsParts[currentPart],
          handleClickNewsLink
        )}
        {renderButtons(handleClickButton, currentPart, lastPart)}
      </div>
    </div>
  );
};

export default Modal;
