/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import BasicTable from '../components/tables/BasicTables';
import UserlistTable from '../components/tables/UserlistTable';
import GoodsTable from '../components/tables/GoodsTable';

import Dashboard from '../components/dashboard/Dashboard';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from '../components/widget/Bundle';

import Login from '../components/pages/Login'

const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/app/dashboard/index" component={Dashboard} />
                    <Route exact path="/app/table/basicTable" component={BasicTable} />
                    <Route exact path="/app/table/userlistTable" component={UserlistTable} />
                    <Route exact path="/app/table/goodsTable" component={GoodsTable} />

                    <Route exact path="/app/ui/wysiwyg" component={WysiwygBundle} />

                    <Route render={() => <Redirect to="/404" />} />
                
            </Switch>
        )
    }
}