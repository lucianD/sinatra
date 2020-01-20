import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import './styles/base.scss';

import store from './store/index';
import Routes from './routes';


ReactDOM.render(
    <Provider store={store}>
            <Routes />
    </Provider>,
    document.getElementById('root')
);
