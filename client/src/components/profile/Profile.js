import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { useParams } from "react-router-dom";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  const { id } = useParams();

  console.log(`ID IS ${id}`);

  useEffect(() => {
    getProfileById(id); //matches the id in the url
  }, [getProfileById]);

  console.log(profile);

  return (
    <Fragment>
      {profile === null || loading ? <Spinner /> : <Fragment>profile</Fragment>}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
