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
    textId: faker.datatype.uuid(),
    partId: parentId,
    text: faker.lorem.text(),
  };
};

const createNewsPart = (parentId) => {
  const partId = faker.datatype.uuid();
  return {
    partId: partId,
    newsId: parentId,
    img: '',
    backgroundColor: '',
    url: '',
    textList: createList(createText, 3, partId),
  };
};

const createNews = (newsId) => {
  return {
    newsId: newsId,
    newsName: faker.lorem.word(),
    background: faker.image.nature(1234, 2345, true),
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
