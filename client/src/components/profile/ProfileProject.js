import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileProject = ({
  project: { title, link, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{title}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Link: </strong> {link}
    </p>
    <p>
      <strong>Description</strong> {description}
    </p>
  </div>
);

ProfileProject.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProfileProject;
