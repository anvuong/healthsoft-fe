import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import toastHelper from '../../helpers/toast';

class PatientsTable extends Component {

  deletePatient = id => {
    let confirmDelete = window.confirm('Do you really want to delete the patient?')
    if (confirmDelete) {
      fetch(`http://localhost:5000/patients/${id}`, {
      method: 'delete'
    })
      .then(response => {
        if (response.status === 204) {
          toastHelper.showSuccess('The patient has been soft-deleted successfully')
          this.props.deletePatient(id)
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {

    const patients = this.props.patients.map(item => {
      return (
        <tr key={item.patientId}>
          <th scope="row">{item.patientId}</th>
          <td>{item.firstName}</td>
          <td>{item.middleName}</td>
          <td>{item.lastName}</td>
          <td>{item.dob}</td>
          <td>{item.gender}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" patient={item} updatePatient={this.props.updatePatient}/>
              {' '}
              {!item.softDeleted && <Button color="danger" onClick={() => this.deletePatient(item.id)}>Delete</Button>}
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>PatientID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients}
        </tbody>
      </Table>
    )
  }
}

export default PatientsTable