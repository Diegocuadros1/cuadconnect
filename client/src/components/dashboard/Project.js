import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/profile';

const Project = ({ project, deleteProject }) => {
  const projects = project.map(pro => (
    <tr key={pro._id}>
      <td>{pro.title}</td>
      <td className='hide-sm'>{pro.description}</td>
      <td className='hide-sm'>{pro.link === null ? ('No link') : pro.link}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{pro.from}</Moment> - {
          pro.to===null ? (' Now') : 
          (<Moment format='YYYY/MM/DD'>{pro.to}</Moment>)
        }
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteProject(pro._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Project Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th className='hide-sm'>description</th>
            <th className='hide-sm'>link</th>
            <th className='hide-sm'>years</th>
            <th />
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </table>
    </Fragment>
  )

}

Project.propTypes = {
  project: PropTypes.array.isRequired,
  deleteProject: PropTypes.func.isRequired,
}

export default connect(null, { deleteProject }) (Project);