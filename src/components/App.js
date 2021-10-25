import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ChakraProvider } from "@chakra-ui/react"

import Home from './Home';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <ChakraProvider>
            <PrivateRoute exact path="/">
              <Home moneyOwed={0} leftToBorrow={50} moneyYouHave={0}></Home>
            </PrivateRoute>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </ChakraProvider>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
