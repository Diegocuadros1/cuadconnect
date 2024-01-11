import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";

const CreateProfile = ({ createProfile }) => {
  const navigate = useNavigate();

  //setting the original formData into a state
  const [formData, setFormData] = useState({
    school: "",
    website: "",
    location: "",
    grade: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    snapchat: "",
    discord: "",
    phone: "",
  });

  //toggling the display social inputs button
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  //destructuring the formData
  const {
    school,
    website,
    location,
    grade,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    snapchat,
    discord,
    phone,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="grade" value={grade} onChange={(e) => onChange(e)}>
            <option value="0">* Select you grade</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="grad">Grad Student</option>
            <option value="alumni">Alumni</option>
            <option value="highschool">High School</option>
            <option value="other">Other</option>
          </select>
          <small className="form-text">What is your grade?</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Show you school spirit!</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own personal website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram username"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-discord fa-2x"></i>
              <input
                type="text"
                placeholder="Discord username"
                name="discord"
                value={discord}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-snapchat fa-2x"></i>
              <input
                type="text"
                placeholder="Snapchat username"
                name="snapchat"
                value={snapchat}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <input
                type="text"
                placeholder="phone number"
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
