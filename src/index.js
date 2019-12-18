import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Oer from './oers/Oer';
import Notfound from "./Notfound";
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/oer/:id" component={Oer} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
