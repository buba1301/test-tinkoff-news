import React from 'react';

import NewsList from '../NewsList';

import s from './Container.module.css';

import { useFetchData } from '../../hooks';

const Containner = () => {
  const { newsList, newsPartsList, newsPagesCount } = useFetchData();
  console.log('RE-RENRER CONTAINER', newsList);

  return (
    <div className={s.newsContainer}>
      <div className={s.newsWrap}>
        <NewsList
          newsList={newsList}
          newsPartsList={newsPartsList}
          newsPagesCount={newsPagesCount}
        />
      </div>
    </div>
  );
};

export default Containner;
