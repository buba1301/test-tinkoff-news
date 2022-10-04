import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';

const arrowButtons = ['left', 'right'];

const Modal = ({ newsParts }) => {
  const [currentPageIndex, setNextIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    setCurrentPage(newsParts[currentPageIndex]);
  }, [currentPageIndex]);

  const getClassNamesButtonsArrow = (direction) =>
    cn(s.newsButtonArrows, s[direction]);

  return (
    <div className={s.modal}>
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
        ></div>
      ))}
    </div>
  );
};

export default Modal;
