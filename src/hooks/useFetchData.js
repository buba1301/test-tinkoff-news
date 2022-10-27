import { useEffect, useState } from 'react';

import { mockApi } from '../apimock/index';

const prepareData = (data) => {
  return data.reduce(
    (acc, elem) => {
      acc.byId.push(elem);
      acc.ids.push(elem.id);
      return acc;
    },
    { byId: [], ids: [] }
  );
};

export const useFetchData = () => {
  const [newsList, setNewsList] = useState({ byId: [], ids: [] });
  const [newsPartsList, setNewsPartsList] = useState({
    byId: [],
    ids: [],
  });
  const [newsPagesCount, setNewsPageCount] = useState(0);

  console.log('Render useFetchData');

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();

      const { newsList, newsPartsList, newsPagesCount } = response;
      // console.log(response);
      // setData(response);
      setNewsList(prepareData(newsList));
      setNewsPartsList(prepareData(newsPartsList));
      setNewsPageCount(newsPagesCount);
    };

    fetchData();
  }, []);

  return { newsList, newsPartsList, newsPagesCount };
};
