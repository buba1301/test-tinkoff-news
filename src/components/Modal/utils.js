const checkoutToNextNews = (
  currentNewsIndex,
  newsIds,
  setCurrentNewsId,
  direction = 'right'
) => {
  const shift = 1;
  const value = direction === 'right' ? shift : -shift;

  const nextNewsIndex = currentNewsIndex + value;

  setCurrentNewsId(newsIds[nextNewsIndex]);
};

export default checkoutToNextNews;
