import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Decides whether the component is authenticated or not, and if not will rediriect to  the login / register page

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  //Check user authentication status
  if (!auth.isAuthenticated && !auth.loading) {
    return <Navigate to={"/Login"} />;
  }

  //Render the component with the props passed:
  return <Component {...rest} />;
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

//setting the state of the outhenticateion (whether the user is logged in or not)
const mapStatetoProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProp)(PrivateRoute);

//<Routes>
//<Route
//{...rest} //the rest of whatever is inside the component
//render={(props) =>
//  !auth.isAuthenticated && !auth.loading ? ( //If the user is not authenticated and the user is not loading
//    <Navigate to={"/login"} /> //navigate the user to login
//  ) : (
//    //else
//    <Component {...props} /> //navigate the user to a component
//  )
//}
///>
//</Routes>
//
//
//
//
//
//
//
//
//
//
//
//

////deciding whether the component is autenticated
//const routeRenderer = () =>
//  //if user is not authenticated and the user is not loading
//  !auth.isAuthenticated && !auth.loading ? (
//    //bring them to the login page
//    <Navigate to="/login" replace />
//  ) : (
//    //else
//    //load the component in questiom
//    <Component {...rest} />
//  );
//return (
//  <Routes>
//    <Route {...rest} element={routeRenderer()} />
//  </Routes>
//);
//};
