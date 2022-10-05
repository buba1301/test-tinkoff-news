import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { mockApi } from '../../apimock';
import NewsList from '../NewsList';
import Modal from '../Modal';

import s from './Container.module.css';

const getNewsOnPageList = (newsOnPage, newsPagesCount) => {
  let res = {};

  let firstIndex = 0;
  let lastIndex = newsOnPage;

  for (let i = 0; i < newsPagesCount; i++) {
    res = { ...res, [i + 1]: [firstIndex, lastIndex] };
    firstIndex = firstIndex + newsOnPage;
    lastIndex = lastIndex + newsOnPage;
  }

  return res;
};

const filterNewsPartsList = (list, currentNewsId) =>
  list.filter((e) => e.newsId === currentNewsId);

const getCurrentNewsIndex = (currentNewsId, list) =>
  list.findIndex((elem) => elem.newsId === currentNewsId);

const Containner = () => {
  const [data, setData] = useState({
    newsList: [],
    newsPartsList: [],
    newsPagesCount: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [currentNewsId, setCurrentNewsId] = useState('');

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const [newsOnPage, setNewsOnPage] = useState({});

  const [newsOnPageList, setNewsOnPageList] = useState([]);

  const [currentNewsPartList, setCurrentNewsPartsList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();

      setData(response);

      const newsPagesCount = response.newsPagesCount;

      const newsOnPage = response.newsList.length / response.newsPagesCount;

      setNewsOnPage(() => getNewsOnPageList(newsOnPage, newsPagesCount));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const res = newsOnPage[currentPage];

    const startNews = res && res[0];
    const endNews = res && res[1];

    setNewsOnPageList(data.newsList.slice(startNews, endNews));
  }, [currentPage, data]);

  useEffect(() => {
    setCurrentNewsPartsList(
      filterNewsPartsList(data.newsPartsList, currentNewsId)
    );
  }, [currentNewsId]);

  const handleClickNextPageButton = (e) => {
    const currentPageValue =
      e.target.id === 'next' ? currentPage + 1 : currentPage - 1;

    setCurrentPage(currentPageValue);
  };

  const handleCheckoutNextOrPrevNews = (direction) => {
    const shiftNewsIndex = direction === 'right' ? 1 : -1;

    const currentNewsIndex = getCurrentNewsIndex(currentNewsId, data.newsList);

    const nextNewsIndex = currentNewsIndex + shiftNewsIndex;

    setCurrentNewsIndex(nextNewsIndex);

    const nextNewsId = data.newsList[nextNewsIndex].newsId;

    setCurrentNewsId(nextNewsId);
  };

  const handleOpenModal = (e) => {
    const currentNewsId = e.target.id;

    const currentNewsIndex = getCurrentNewsIndex(currentNewsId, data.newsList);

    setModalOpen(true);
    setCurrentNewsId(currentNewsId);
    setCurrentNewsIndex(currentNewsIndex);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const modalRootClassnames = cn(s.modalRoot, {
    [s.open]: modalOpen,
  });

  return (
    <>
      <div className={s.newsContainer}>
        <div className={s.newsWrap}>
          <div className={s.header}>
            <h1>Для вас</h1>
            <div className={s.sliderArrows}>
              <div className={s.arrowButtonsWrap}>
                <button
                  disabled={currentPage === 1}
                  id='previous'
                  onClick={handleClickNextPageButton}
                ></button>
              </div>
              <div className={s.arrowButtonsWrap}>
                <button
                  disabled={currentPage === data.newsPagesCount}
                  id='next'
                  onClick={handleClickNextPageButton}
                ></button>
              </div>
            </div>
          </div>
          <NewsList newsList={newsOnPageList} openModal={handleOpenModal} />
          <div>{currentNewsId}</div>
        </div>
      </div>
      <div className={modalRootClassnames} onClick={handleCloseModal}>
        {currentNewsPartList.length > 0 && (
          <Modal
            newsParts={currentNewsPartList}
            isOpen={modalOpen}
            onClick={handleCheckoutNextOrPrevNews}
            currentNewsIndex={currentNewsIndex}
            lastNewsIndex={data.newsList.length - 1}
          />
        )}
      </div>
    </>
  );
};

export default Containner;
