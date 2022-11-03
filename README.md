# Тестовое задание


Проект (https://lovely-dragon-952b7f.netlify.app/)

Было необходимо реализовать приложение по образцу новостей в приложении Тиньков.

- mock Api
- переключение карточек новостей по нажатию на кнопки навигации
- при клике на карточку новости открытие модального окна с отображением текстов новости, начиная с первой части (всего в одной новости содержится 10 частей)
- реализовать преключение частей новости по кликам на кнопки с условиями:

  1.  Если новость первая и часть новости первая левая кнопка блокируется
  2.  Если часть новости последняя, переключаем на следующуу новости не закрывая окно
  3.  Если новость последняя, то правая кнопка блокируется
  4.  Если часть новости первая и клик на левой кнопки, то перемещаемся в предыдущую новость и открываем первую часть новости

- реализовать прогресс бар для кажной части новости. По истечении времени, переключить на следующую новость. Есди чать новости последняя преключаем на следующую новость. Если новость последняя и почледняя часть новости то закрываем окно и сбрасываем состояние активной новоти и части новости.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
