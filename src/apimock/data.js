import { faker } from '@faker-js/faker';

const state = {
  newsList: [],
  newsPartsList: [],
  newsPagesCount: 3,
};

const createList = (createFunc, count, parentId) => {
  const res = [];

  for (let i = 0; i < count; i++) {
    res.push(createFunc(parentId));
  }

  return res;
};

const createText = (parentId) => {
  return {
    id: faker.datatype.uuid(),
    partId: parentId,
    text: faker.lorem.text(),
  };
};

const createNewsPart = (parentId) => {
  const partId = faker.datatype.uuid();
  return {
    id: partId,
    newsId: parentId,
    img: '',
    backgroundColor: '',
    url: '',
    textList: createList(createText, 3, partId),
  };
};

const createNews = (newsId) => {
  return {
    id: newsId,
    newsName: faker.lorem.word(),
  };
};

const createNewsList = () => {
  const newsCount = 12;

  for (let i = 0; i < newsCount; i++) {
    const newsId = faker.datatype.uuid();
    state.newsList.push(createNews(newsId));

    const newsParts = createList(createNewsPart, 10, newsId);
    state.newsPartsList.push(newsParts);
  }

  state.newsPartsList = state.newsPartsList.flat();
};

createNewsList();

export const dataFromServer = state;
