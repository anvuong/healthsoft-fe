import React, { Component } from 'react'
import { Container, Row, Col, Label, Input } from 'reactstrap'
import { ToastContainer } from 'react-toastify';
import ModalForm from './components/Modals/Modal'
import PatientsTable from './components/Tables/PatientsTable'

class App extends Component {
  state = {
    patients: [],
    showSoftDeleted: false
  }

  getPatients = () => {
    const url = this.state.showSoftDeleted ? 'http://localhost:5000/patients?withDeleted=true' : 'http://localhost:5000/patients'
    fetch(url)
      .then(response => response.json())
      .then(patients => this.setState({patients}))
      .catch(err => console.log(err))
  }

  updatePatient = (patient) => {
    const patientIndex = this.state.patients.findIndex(data => data.id === patient.id)
    const newArray = [
    // destructure all patients from beginning to the indexed patient
      ...this.state.patients.slice(0, patientIndex),
    // add the updated patient to the array
      patient,
    // add the rest of the patients to the array from the index after the replaced patient
      ...this.state.patients.slice(patientIndex + 1)
    ]
    this.setState({ patients: newArray })
  }

  onShowSoftDeletedChanged = () => {
    this.setState({ showSoftDeleted: !this.state.showSoftDeleted })
    setTimeout(() => this.getPatients(), 0)
  }

  componentDidMount(){
    this.getPatients()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Patients List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <PatientsTable patients={this.state.patients} updatePatient={this.updatePatient} deletePatient={this.getPatients} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Patient" addPatient={this.getPatients}/>
          </Col>
          <Col>
            <Label check>
              <Input type="checkbox" value={this.state.showSoftDeleted} onChange={this.onShowSoftDeletedChanged}/>{' '}
              Show soft-deleted patients
            </Label>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    )
  }
}

export default App