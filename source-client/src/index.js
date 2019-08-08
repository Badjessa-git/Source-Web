import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import SourceWebStore from './stores/SourceWebStore';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import history from './history';

ReactDOM.render(
    <Provider store={SourceWebStore}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
