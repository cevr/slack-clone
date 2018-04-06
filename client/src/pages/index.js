import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    </BrowserRouter>
);
