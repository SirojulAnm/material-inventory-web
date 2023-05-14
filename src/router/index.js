import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register'
import Navbar from '../components/Navbar';
import Materials from '../pages/Materials';
import Transaction from '../pages/Transaction';
import TransactionList from '../pages/TransactionList';
import ApprovalList from './../pages/ApprovalList'
import TransactionApproval from '../pages/TransactionApproval';
import MaterialsAdd from '../pages/MaterialsAdd'
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
              <Route path="/register" component={Register} />
              <PrivateRoute path="/materials" component={Materials} />
              <PrivateRoute path="/transaction" component={Transaction} />
              <PrivateRoute path="/transaction-list" component={TransactionList} />
              <PrivateRoute path="/approval-list" component={ApprovalList} />
              <PrivateRoute path="/approval/:id" component={TransactionApproval} />
              <PrivateRoute path="/materials-add" component={MaterialsAdd} />
          </Switch>
        </BrowserRouter>
    );
}

export default Index;