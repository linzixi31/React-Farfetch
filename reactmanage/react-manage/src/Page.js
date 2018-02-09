import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => <Redirect to="/login" push />} />        
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)