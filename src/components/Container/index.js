import React, { useEffect, useState } from 'react';

import { mockApi } from '../../api mock';
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

const Containner = () => {
  const [data, setData] = useState({
    newsList: [],
    newsPartsList: [],
    newsPagesCount: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [newsOnPage, setNewsOnPage] = useState({});

  const [newsOnPageList, setNewsOnPageList] = useState([]);

  const [currentNewsPartList, setCurrentNewsPartList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();
      setData(response);

      const newsPagesCount = response.newsPagesCount;

      const newsOnPage = response.newsList.length / response.newsPagesCount;

      const newsIndexPerPage = getNewsOnPageList(newsOnPage, newsPagesCount);

      setNewsOnPage(newsIndexPerPage);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const res = newsOnPage[currentPage];

    const startNews = res && res[0];
    const endNews = res && res[1];

    setNewsOnPageList(data.newsList.slice(startNews, endNews));
  }, [currentPage, data]);

  const handleClickNextPageButton = (e) => {
    const currentPageValue =
      e.target.id === 'next' ? currentPage + 1 : currentPage - 1;

    setCurrentPage(currentPageValue);
  };

  const handleOpenModal = (e) => {
    const currentNewsId = e.target.id;

    const filterNewsPartsList = data.newsPartsList.filter(
      (e) => e.newsId === currentNewsId
    );

    // console.log('filter', filterNewsPartsList);

    setCurrentNewsPartList(filterNewsPartsList);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          <div>{`${modalOpen}`}</div>
        </div>
      </div>
      {modalOpen && (
        <div className={s.modalRoot} onClick={handleCloseModal}>
          <Modal />
        </div>
      )}
    </>
  );
};

export default Containner;
