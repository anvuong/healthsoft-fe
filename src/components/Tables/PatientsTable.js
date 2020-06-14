import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class PatientsTable extends Component {

  deletePatient = id => {
    let confirmDelete = window.confirm('Do you really want to delete the patient?')
    if (confirmDelete) {
      fetch(`http://localhost:5000/patients/${id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.firstName}</td>
          <td>{item.middleName}</td>
          <td>{item.lastName}</td>
          <td>{item.patientId}</td>
          <td>{item.dob}</td>
          <td>{item.gender}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deletePatient(item.id)}>Delete</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>PatientID</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default PatientsTable