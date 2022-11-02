import React, { useState } from 'react';
import { ModalContext } from '../../context';
import { useModal } from '../../hooks';
import Button from '../Button';
import CardWrap from '../Card';

import s from './NewsList.module.css';

const buttons = ['prev', 'next'];

const NewsList = ({ newsList, newsPartsList, newsPagesCount }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [currentNewsId, setCurrentNewsId] = useState('');

  const { Dialog, open } = useModal();

  const lastPage = newsPagesCount - 1;

  const newsCount = newsList.ids.length / newsPagesCount;

  const firstNewsIndex = currentPage * newsCount;
  const lastNewsIndex = firstNewsIndex + newsCount;

  const newsOnPageList = newsList.byId.slice(
    firstNewsIndex,
    lastNewsIndex
  );

  const handleClickChangePage = (e) => {
    const direction = e.target.id;
    const shift = 1;

    const value = direction === 'next' ? shift : -shift;
    setCurrentPage((prevState) => prevState + value);
  };

  const handleClickCard = (e) => {
    open();
    setCurrentNewsId(e.target.id);
  };

  return (
    <>
      <div className={s.header}>
        <h1>Для вас</h1>
        <div className={s.sliderArrows}>
          {buttons.map((id) => (
            <div className={s.arrowButtonsWrap} key={id}>
              <Button
                id={id}
                onClick={handleClickChangePage}
                disabled={
                  (id === 'prev' && currentPage === 0) ||
                  (id === 'next' && currentPage === lastPage)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className={s.newsWrap}>
        <CardWrap
          newsOnPageList={newsOnPageList}
          onClick={handleClickCard}
        />
      </div>
      <ModalContext.Provider
        value={{
          newsPartsList,
          currentNewsId,
          newsIds: newsList.ids,
          setCurrentNewsId,
        }}
      >
        <Dialog />
      </ModalContext.Provider>
    </>
  );
};

export default NewsList;
