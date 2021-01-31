import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import { auth } from "./firebase";
import Login from "./components/Login/Login";
import "./App.css";
import { useStateValue } from "./components/Context/ContextProvider";
import Payment from "./components/Payment/Payment";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import Orders from "./components/Orders/Orders";

const promise = loadStripe('pk_test_51IFHykDwPpnoI9tJJsMo6zIYWAsIrdOEln6zYppDMcBESTWf1ZBuUF73rJs6PELvDacTs0OuJM3RwL2hNf5fF7hn00SWZO2IZK')

function App() {
  
  const [{}, dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged(userLoggedIn => {
      console.log("Logged in hser is",userLoggedIn)
      if (userLoggedIn) {
        dispatch({
          type: "SET_USER",
          payload: userLoggedIn,
        });
      } else {
        dispatch({
          type: "REMOVE_USER",
          payload: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>

          </Route>
          <Route path="/orders">
          <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
