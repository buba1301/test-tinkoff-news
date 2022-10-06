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

const filterNewsPartsList = (list, currentNewsId) => {
  if (list.length === 0) {
    return [];
  }

  return list.filter((e) => e.newsId === currentNewsId);
};

const getCurrentNewsIndex = (currentNewsId, list) => {
  return list.findIndex((elem) => elem.newsId === currentNewsId);
};

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
    const startAndEndNewsIndexList = newsOnPage[currentPage];

    const startNews = startAndEndNewsIndexList && startAndEndNewsIndexList[0];
    const endNews = startAndEndNewsIndexList && startAndEndNewsIndexList[1];

    const newsOnCurrentPageList = data.newsList.slice(startNews, endNews);

    setNewsOnPageList(newsOnCurrentPageList);
  }, [currentPage, data]);

  useEffect(() => {
    setCurrentNewsPartsList(
      filterNewsPartsList(data.newsPartsList, currentNewsId)
    );
  }, [currentNewsId]);

  const handleClickNextPageButton = (e) => {
    const shift = 1;
    const currentPageValue =
      e.target.id === 'next' ? currentPage + shift : currentPage - shift;

    setCurrentPage(currentPageValue);
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
    setCurrentNewsPartsList([]);
    setCurrentNewsId('');
    setCurrentNewsIndex(0);
  };

  const handleCheckoutNextOrPrevNews = (direction) => {
    const shiftNewsIndex = direction === 'right' ? 1 : -1;

    const currentNewsIndex = getCurrentNewsIndex(currentNewsId, data.newsList);

    const isLastNews = currentNewsIndex === data.newsList.length - 1;

    if (isLastNews) {
      handleCloseModal();
      return;
    }

    const nextNewsIndex = currentNewsIndex + shiftNewsIndex;

    setCurrentNewsIndex(nextNewsIndex);

    const nextNewsId = data.newsList[nextNewsIndex].newsId;

    setCurrentNewsId(nextNewsId);
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
          <div className={s.progressBar}>
            <div className={s.animation}></div>
          </div>
        </div>
      </div>
      <div className={modalRootClassnames} onClick={handleCloseModal}>
        {currentNewsPartList.length > 0 && (
          <Modal
            newsParts={currentNewsPartList}
            isOpen={modalOpen}
            checkoutNextOrPrevNews={handleCheckoutNextOrPrevNews}
            currentNewsIndex={currentNewsIndex}
            lastNewsIndex={data.newsList.length - 1}
          />
        )}
      </div>
    </>
  );
};

export default Containner;
