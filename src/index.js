import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//provider imports
import UserContextProvider from './context/UserContext';
import MainPostContextProvider from './context/MainPostContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <MainPostContextProvider>
        <App />
      </MainPostContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
