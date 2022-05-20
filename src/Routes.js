/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Components
//import PrivateRoute from './components/Routes/PrivateRoute';

// Routes
import AdminLayout from "./routes/Admin";
import AuthLayout from "./routes/Auth";

export function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Route path="/admin" component={AdminLayout} />
                <Route path="setting" components={<h1>Hello World</h1>} />
                <Redirect from="/" to="/auth" />
            </Switch>
        </BrowserRouter>
    );
}