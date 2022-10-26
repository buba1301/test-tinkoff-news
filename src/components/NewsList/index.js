import React, { useEffect, useState } from 'react';
import { useModal } from '../../hooks';
import Button from '../Button';
import CardWrap from '../Card';
import Card from '../Card';

import s from './NewsList.module.css';

const buttons = ['prev', 'next'];

const filterNewsPartsList = (newsPartsList, newsId) =>
  newsPartsList.filter((p) => p.newsId === newsId);

const NewsList = ({ newsList, newsPartsList, newsPagesCount }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const lastPage = newsPagesCount - 1;

  console.log('RENRER NEWS LIST', newsPartsList);

  const newsCount = newsList.length / newsPagesCount;

  const firstNewsIndex = currentPage * newsCount;
  const lastNewsIndex = firstNewsIndex + newsCount;

  const newsOnPageList = newsList.slice(firstNewsIndex, lastNewsIndex);

  const handleClickChangePage = (e) => {
    const direction = e.target.id;
    const shift = 1;

    const value = direction === 'next' ? shift : -shift;
    setCurrentPage((prevState) => prevState + value);
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
                  (id === 'next') & (currentPage === lastPage)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className={s.newsWrap}>
        <CardWrap
          // newsName={newsName}
          // newsId={newsId}
          // background={background}
          // key={newsId}
          // newsParts={filterNewsPartsList(newsPartsList, newsId)}
          newsParts={newsPartsList}
          newsOnPageList={newsOnPageList}
        />
      </div>
    </>
  );

  /* const [newsOnPage, setNewsOnPage] = useState([]);

  useEffect(() => {
    const newsCount = newsList.length / newsPagesCount;

    const firstNewsIndex = currentPage * newsCount;
    const lastNewsIndex = firstNewsIndex + newsCount;
  }, [newsPagesCount, currentPage]); */
  /* const [currentPage, setCurrentPage] = useState(1);

  const { newsOnPageList } = useNewsOnPageList(data, currentPage);

  const handleClickNextPageButton = (e) => {
    const shift = 1;
    const currentPageValue =
      e.target.id === 'next' ? currentPage + shift : currentPage - shift;

    setCurrentPage(currentPageValue);
  };

  const disabledButton = (direction) =>
    direction === 'next'
      ? currentPage === data.newsPagesCount
      : currentPage === 1;

  return (
    <>
      <div className={s.header}>
        <h1>Для вас</h1>
        <div className={s.sliderArrows}>
          {buttons.map((id) => (
            <div className={s.arrowButtonsWrap} key={id}>
              <Button
                id={id}
                onClick={handleClickNextPageButton}
                disabled={disabledButton(id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={s.newsWrap}>
        {newsList.map(({ newsName, newsId, background }) => {
          const style = {
            backgroundImage: `url(${background})`,
          };

          return (
            <div
              className={s.newsCard}
              key={newsId}
              id={newsId}
              onClick={openModal}
              style={style}
            >
              {newsName}
            </div>
          );
        })}
      </div>
    </>
  ); */
};

export default NewsList;
