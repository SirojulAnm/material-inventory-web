import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Login from '../pages/auth/Login';
import Navbar from '../components/Navbar';
import Materials from '../pages/Materials';
import Transaction from '../pages/Transaction';
import TransactionList from '../pages/TransactionList';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../store/index.js';
import Home from '../pages/Home';

function PrivateRoute({ component: Component, ...rest }) {
    const authenticated = useRecoilValue(tokenState);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated.check ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function Index() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/materials" component={Materials} />
                <PrivateRoute path="/transaction" component={Transaction} />
                <PrivateRoute path="/transaction-list" component={TransactionList} />
            </Switch>
        </BrowserRouter>
    );
}

export default Index;