import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" excact component={HomePage} />
        </Switch>
    </BrowserRouter>
);
