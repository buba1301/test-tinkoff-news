import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import NewsList from '../NewsList';
import Modal from '../Modal';

import s from './Container.module.css';

import { useFetchData, useNewsOnPageList } from '../../hooks';
import Button from '../Button';

const buttons = ['prev', 'next'];

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
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useFetchData();

  const { newsOnPageList } = useNewsOnPageList(data, currentPage);

  const [currentNewsId, setCurrentNewsId] = useState('');

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const [currentNewsPartList, setCurrentNewsPartsList] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

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

  const disabledButton = (direction) =>
    direction === 'next'
      ? currentPage === data.newsPagesCount
      : currentPage === 1;

  return (
    <>
      <div className={s.newsContainer}>
        <div className={s.newsWrap}>
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
          <NewsList newsList={newsOnPageList} openModal={handleOpenModal} />
        </div>
      </div>
      <div className={modalRootClassnames} onClick={handleCloseModal}>
        <span className={s.btnClose}></span>
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
