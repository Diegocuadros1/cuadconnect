import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Login from './components/layout/auth/Login';
import Register from './components/layout/auth/Register';
//NOTE: Every Route(when trying to access a page) must have a parent element of Routes and the full thing must also be wrapped around a Router parent element
//Exact means it matches with the pathname exactly and not anything else (eg. /about)
const App = () => (
  <Router>
    
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Landing} />
        </Routes>
        <section className='container'>
            <Routes>
              <Route exact path='register' Component={Register} />
              <Route exact path='login' Component={Login} />
            </Routes>
        </section>
      </Fragment>
    
  </Router>

  );

export default App;
