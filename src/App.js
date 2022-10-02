import React from 'react';
import logo from './logo.svg';
import './App.css';

import { dataFromServer } from './api mock/data';
import Containner from './components/Container';

function App() {
  return (
    <div className='App'>
      <Containner />
    </div>
  );
}

export default App;
