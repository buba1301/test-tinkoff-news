export const getShiftValue = (direction) => {
  const shift = 1;

  const value = direction === 'right' ? shift : -shift;

  return value;
};

export const checkoutNews = (
  currentNewsIndex,
  newsIds,
  setCurrentNewsId,
  direction = 'right'
) => {
  const value = getShiftValue(direction);

  const nextNewsIndex = currentNewsIndex + value;

  setCurrentNewsId(newsIds[nextNewsIndex]);
};
