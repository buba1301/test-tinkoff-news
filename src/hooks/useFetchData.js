import { useEffect, useState } from 'react';

import { mockApi } from '../apimock/index';

export const useFetchData = () => {
  const [newsList, setNewsList] = useState([]);
  const [newsPartsList, setNewsPartsList] = useState([]);
  const [newsPagesCount, setNewsPageCount] = useState(0);

  /* const [data, setData] = useState({
    newsList: [],
    newsPartsList: [],
    newsPagesCount: 0,
  }); */

  console.log('Render useFetchData');

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();

      const { newsList, newsPartsList, newsPagesCount } = response;
      // console.log(response);
      // setData(response);
      setNewsList(newsList);
      setNewsPartsList(newsPartsList);
      setNewsPageCount(newsPagesCount);
    };

    fetchData();
  }, []);

  return { newsList, newsPartsList, newsPagesCount };
};
