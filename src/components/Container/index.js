import React, { useEffect, useState } from 'react';

import { mockApi } from '../../api mock';
import NewsList from '../NewsList';

import s from './Container.module.css';

const itemsIndexPerPage = {
  1: [0, 4],
  2: [4, 8],
  3: [8, 12],
};

const Containner = () => {
  const [data, setData] = useState({
    newsList: [],
    newsPartsList: [],
  });

  const [newsOnPage, setNewsOnPage] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();
      setData(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const [startNews, endNews] = itemsIndexPerPage[currentPage];

    setNewsOnPage(data.newsList.slice(startNews, endNews));
  }, [currentPage, data]);

  return (
    <div className={s.newsContainer}>
      <div className={s.newsWrap}>
        <div className={s.header}>
          <h1>Для вас</h1>
          <div className={s.sliderArrows}>
            <div className={s.arrowButtonsWrap}>
              <button></button>
            </div>
            <div className={s.arrowButtonsWrap}>
              <button></button>
            </div>
          </div>
        </div>
        <NewsList newsList={newsOnPage} />
        <div>Navigation</div>
      </div>
    </div>
  );
};

export default Containner;
