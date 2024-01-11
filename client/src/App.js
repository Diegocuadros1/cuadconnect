//Importing React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

//Importing css
import "./App.css";

//Importing Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";

//Importing Redux
import { Provider } from "react-redux";
import store from "./store";

//Actions
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//if user is logged in
if (localStorage.token) {
  //setting token to either existing or non existing
  setAuthToken(localStorage.token);
}

//NOTE: Every Route(when trying to access a page) must have a parent element of Routes and the full thing must also be wrapped around a Router parent element
const App = () => {
  //setting hook for loading a user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //[] makes sure it only runs once instead of every time

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path="/create-profile"
                element={<PrivateRoute component={CreateProfile} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
