import React, { useEffect, useState } from 'react';

import s from './Modal.module.css';

const Modal = ({ newsParts }) => {
  const [currentPageIndex, setNextIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    setCurrentPage(newsParts[currentPageIndex]);
  }, [currentPageIndex]);

  return (
    <div className={s.modal}>
      {currentPage.textList &&
        currentPage.textList.map((elem, index) => {
          const className = `text${index}`;
          return (
            <div className={className} key={elem.textId}>
              {elem.text}
            </div>
          );
        })}
    </div>
  );
};

export default Modal;
