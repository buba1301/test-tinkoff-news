import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';
import Button from '../Button';

const arrowButtons = ['left', 'right'];

const Modal = ({
  newsParts,
  isOpen,
  onClosed,
  checkoutNextOrPrevNews,
  currentNewsIndex,
  lastNewsIndex,
}) => {
  const handleClickNewsLink = () => {
    console.log('Click on link news');
  };

  console.log('RENDER modal', newsParts);

  return (
    <div className={s.modalBlanket} onClick={onClosed}>
      <div className={s.modal} onClick={handleClickNewsLink}></div>
    </div>
  );
};

export default Modal;

/* const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState({});

  console.log('RENRER MODAL');

  useEffect(() => {
    if (currentPageIndex < newsParts.length) {
      setCurrentPage(newsParts[currentPageIndex]);
    }
  }, [currentPageIndex, newsParts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPageIndex((prevState) => prevState + 1);
    }, 5000);

    if (currentPageIndex === newsParts.length) {
      const direction = 'right';
      checkoutNextOrPrevNews(direction);
      setCurrentPageIndex(0);
    }

    return () => clearTimeout(timer);
  }, [currentPageIndex]);

  const handleClickButtonsArrow = (e) => {
    e.stopPropagation();

    const id = e.target.id;

    const firstNewsParts = 0;
    const lastNewsPartIndex = newsParts.length - 1;

    if (currentPageIndex === lastNewsPartIndex) {
      checkoutNextOrPrevNews(id);
      setCurrentPageIndex(0);
    } else if (currentPageIndex === firstNewsParts && id === 'left') {
      checkoutNextOrPrevNews(id);
      setCurrentPageIndex(0);
    } else {
      setCurrentPageIndex((prevState) =>
        id === 'left' ? prevState - 1 : prevState + 1
      );
    }
  };

  const handleClickNewsLink = (e) => {
    e.stopPropagation();
  };

  const classNamesTextContainer = (index) => {
    const key = `text${index}`;
    return cn(s[key]);
  };

  const getClassNamesButtonsArrow = (direction) =>
    cn(s.newsButtonArrows, s[direction]);

  const modalClassNames = cn(s.modal, {
    [s.open]: isOpen,
  });

  const getProgressBarClassNames = (partId) =>
    cn(s.progressBar, {
      [s.active]: partId === currentPage.partId,
    });

  const disabledButton = {
    left: currentNewsIndex === 0 && currentPageIndex === 0,
    right:
      currentNewsIndex === lastNewsIndex &&
      currentPageIndex === newsParts.length - 1,
  };

  return (
    <div className={modalClassNames} onClick={handleClickNewsLink}>
      {currentPage.textList &&
        currentPage.textList.map((elem, index) => {
          return (
            <div className={classNamesTextContainer(index)} key={elem.textId}>
              <p>{elem.text}</p>
            </div>
          );
        })}
      {arrowButtons.map((direction) => (
        <div
          className={getClassNamesButtonsArrow(direction)}
          key={direction}
          id={direction}
        >
          <Button
            id={direction}
            onClick={handleClickButtonsArrow}
            disable={disabledButton[direction]}
          />
        </div>
      ))}
      <div className={s.progressBarWrap}>
        {newsParts.map(({ partId }) => (
          <div className={s.progressBarContainer} key={partId}>
            <div className={getProgressBarClassNames(partId)}></div>
          </div>
        ))}
      </div>
    </div>
  ); */
