import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //links after authenticated
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Members</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          {/* dashboard icon and an extra space {" "}*/}
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard </span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  //list before authentication
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Members</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> CuadConnect
        </Link>
      </h1>
      {/* if not loading, then show this fragment */}
      {!loading && (
        <Fragment>
          {/* if user is authenticated, show authLinks, else show guestLinks */}
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
