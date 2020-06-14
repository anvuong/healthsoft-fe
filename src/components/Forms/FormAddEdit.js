import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import toastHelper from '../../helpers/toast';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    patientId: '',
    dob: '',
    gender: 'M'
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleGenderChange = e => {
    this.setState({gender: e.target.value});
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:5000/patients', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        patientId: this.state.patientId,
        dob: this.state.dob,
        gender: this.state.gender
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json && json.id) {
          toastHelper.showSuccess('A new patient has been added successfully')
          this.props.addPatient(json)
          this.props.toggle()
        } else {
          toastHelper.showError(JSON.stringify(json))
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`http://localhost:5000/patients/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        patientId: this.state.patientId,
        dob: this.state.dob,
        gender: this.state.gender
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json && json.id) {
          toastHelper.showSuccess('The patient has been updated successfully')
          this.props.updatePatient(json)
          this.props.toggle()
        } else {
          toastHelper.showError(JSON.stringify(json))
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if patient exists, populate the state with proper data
    if (this.props.patient) {
      const { id, firstName, middleName, lastName, patientId, dob, gender } = this.props.patient
      this.setState({ id, firstName, middleName, lastName, patientId, dob, gender })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.patient ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" onChange={this.onChange} value={this.state.firstName === null ? '' : this.state.firstName} />
        </FormGroup>
        <FormGroup>
          <Label for="middleName">Middle Name</Label>
          <Input type="text" name="middleName" id="middleName" onChange={this.onChange} value={this.state.middleName === null ? '' : this.state.middleName} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" onChange={this.onChange} value={this.state.lastName === null ? '' : this.state.lastName}  />
        </FormGroup>
        <FormGroup>
          <Label for="patientId">PatientID</Label>
          <Input type="text" name="patientId" id="patientId" onChange={this.onChange} value={this.state.patientId === null ? '' : this.state.patientId}  />
        </FormGroup>
        <FormGroup>
          <Label for="dob">Date of Birth</Label>
          <Input type="text" name="dob" id="dob" onChange={this.onChange} value={this.state.dob === null ? '' : this.state.dob} />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input type="select" name="gender" id="gender" onChange={this.handleGenderChange} value={this.state.gender === null ? 'M' : this.state.gender}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Option</option>
          </Input>
        </FormGroup>
        <Button>{this.props.patient ? 'Update Patient' : 'Add Patient'}</Button>
      </Form>
    );
  }
}

export default AddEditForm