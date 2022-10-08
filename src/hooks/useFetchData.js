import { useEffect, useState } from 'react';

import { mockApi } from '../apimock/index';

export const useFetchData = () => {
  const [data, setData] = useState({
    newsList: [],
    newsPartsList: [],
    newsPagesCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockApi.getData();

      setData(response);
    };

    fetchData();
  }, []);

  return { data };
};
