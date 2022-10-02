import React, { useEffect, useState } from 'react';

import { mockApi } from '../../api mock';
import NewsList from '../NewsList';

import s from './Container.module.css';

const Containner = () => {
  const [news, setNews] = useState({
    newsList: [],
    newsPartsList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();
      setNews(response);
    };

    fetchData();
  }, []);

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
        <NewsList data={news} />
        <div>Navigation</div>
      </div>
    </div>
  );
};

export default Containner;
