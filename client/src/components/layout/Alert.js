import React from 'react'
import PropTypes from 'prop-types'
//must use connect whenever you are getting an action / getting state myou must use connect
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
  alerts !== null && //if alerts exist
  alerts.length > 0 &&  //if the length of the alerts array is greater than 0
  alerts.map(alert => (
    //will loop through every alert and output the msg with the matching id
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      { alert.msg }
    </div>
));

Alert.propTypes = {

}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

//mapping redux state to a prop in this component so that we have access to it
const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
