import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'



const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  //changing the text in the inputs whenever there is a change
  const onChange = e => setFormData({
    ...formData, //getting the form data 
    [e.target.name]: e.target.value //e.target.name is either name, email, pw etc., value = whatever is inputted
  });

  //form submission
  const onSubmit = async form => {
    //to not automatically submit and refresh page
    form.preventDefault(); 

    //password matching
    if(password !== password2) {
      //pass props.alert into our actions/alert
      setAlert("passwords do not match", 'danger'); //msg | alertType(for css)

    } else { 
      register({ name, email, password})
      // ----Registering User without Redux ----
      // //creating a new user 
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }

      // try {
      //   //sets a variable for the header
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }

      //   //sets the information newUser into json
      //   const body = JSON.stringify(newUser);

      //   //uses axios to call the server side to POST
      //   const res = await axios.post('/api/users', body, config);

      //   console.log(res.data) //should print the user token

      // } catch (err) {
      //   console.error(err.response.data)
      // }
      // ----END ----
    }
  }

  //redirecting once registered
  if(isAuthenticated){
    return <Navigate to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={form => onSubmit(form)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
             
          />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address"
          value={email} 
          onChange={e => onChange(e)}
          name="email" />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email 
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1"> Already have an account? 
        <Link to="/Login">Sign In</Link>
      </p>
    </Fragment>
  )
}

//make sure set alerts is a prop type so 
//that it can be used in register function as a prop
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

// Connect() Takes in two things (Any state we wanna map)(Object with actions)
export default connect(mapStateToProps, { setAlert, register })(Register);
