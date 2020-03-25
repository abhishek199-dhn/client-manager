import React, {Suspense} from "react";
import {
    Switch,
    HashRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import LoginUtils from "./utils/LoginUtils";
import {RouteProps} from "react-router";
import Header from "./components/Header/Header";

const Login = React.lazy(() => import("./Pages/Login/Login"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));
const ClientContacts = React.lazy(() => import("./Containers/Dashboard/ClientContacts/ClientContacts"));
const ClientsSpendHistory = React.lazy(() => import("./Containers/Dashboard/ClientsSpendHistory/ClientsSpendHistory"));

const PrivateRoute = ({component: Component, children, ...rest}: RouteProps) => (
    <Route {...rest} render={(props) => (
        typeof LoginUtils.getToken() === "string"
            ? Component ? <Component {...props} /> : children
            : <Redirect to={{
                pathname: "/",
            }}/>
    )}/>
);

export default function Routes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <PrivateRoute path="/dashboard">
                        <Header />
                        <Dashboard>
                            <Switch>
                                <PrivateRoute exact path="/dashboard/clientSpends">
                                    <ClientsSpendHistory/>
                                </PrivateRoute>
                                <PrivateRoute exact path="/dashboard/clientContacts">
                                    <ClientContacts/>
                                </PrivateRoute>
                            </Switch>
                        </Dashboard>
                    </PrivateRoute>
                </Switch>
            </Router>
        </Suspense>
    );
}