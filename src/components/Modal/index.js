import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';

const arrowButtons = ['left', 'right'];

//TODO: добавить логику перехода на следующую или предыдущую новости, если все части текущей новости закончились или вернулись на первую часть

//TODO: добавить прогрессбар по каждой новости и автоматическое переключение на следующую новости по окончании времени

const Modal = ({ newsParts, isOpen }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    setCurrentPage(newsParts[currentPageIndex]);
  }, [currentPageIndex]);

  const getClassNamesButtonsArrow = (direction) =>
    cn(s.newsButtonArrows, s[direction]);

  const handleClickButtonsArrow = (e) => {
    e.stopPropagation();

    setCurrentPageIndex((prevState) =>
      e.target.id === 'left' ? prevState - 1 : prevState + 1
    );
  };

  const handleClickNewsLink = (e) => {
    e.stopPropagation();
  };

  const modalClassnames = cn(s.modal, {
    [s.open]: isOpen,
  });

  const disabledButton = {
    left: currentPageIndex === 0,
    right: currentPageIndex === newsParts.length - 1,
  };

  return (
    <div className={modalClassnames}>
      {currentPage.textList &&
        currentPage.textList.map((elem, index) => {
          return (
            <div className={s[`text${index}`]} key={elem.textId}>
              {elem.text}
            </div>
          );
        })}
      {arrowButtons.map((direction) => (
        <div
          className={getClassNamesButtonsArrow(direction)}
          key={direction}
          id={direction}
        >
          <button
            id={direction}
            onClick={handleClickButtonsArrow}
            disabled={disabledButton[direction]}
          ></button>
        </div>
      ))}
    </div>
  );
};

export default Modal;
