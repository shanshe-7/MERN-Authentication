
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Signout from './Signout/Signout';
import authGuard from './HOCs/authGuard'

export const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/dashboard" component={authGuard(Dashboard)}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/signout" component={Signout}/>
            </Switch>
        </>
    )
}


