import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';//引入异步中间件
import reducer from './reducer';
const root = createRoot(document.getElementById('root'));

const middleware = [];
middleware.push(thunk);
const reduxEnhancers = compose(
    applyMiddleware(...middleware),
    (window && window.devToolsExtension ? window.devToolsExtension() : f => f)
);
const store = createStore(reducer, {}, reduxEnhancers);
root.render(<React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider></React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
