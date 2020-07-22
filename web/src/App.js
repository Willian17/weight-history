import React from 'react';
import './App.css';

import Form from './components/Form'
import ListWeight from './components/ListWeight'
import Image from './assets/Image.svg'

function App() {
  return (
    <div className="App">
      <h1 className="title">Histórico de peso Pessoal</h1>
      <div className="content">
        <Form />
        <img src={Image} width="350px" alt="foto"/>
        <ListWeight />
      </div>

    </div>
  );
}

export default App;
