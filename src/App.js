import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Button } from 'reactstrap'
import { ToastContainer } from 'react-toastify';
import ModalForm from './components/Modals/Modal'
import PatientsTable from './components/Tables/PatientsTable'

class App extends Component {
  state = {
    patients: [],
    showSoftDeleted: false,
    searchField: 'FirstName',
    sortDirection: null,
    searchText: null,
  }

  getPatients = () => {
    let url = this.state.showSoftDeleted ? 'http://localhost:5000/patients?withDeleted=true' : 'http://localhost:5000/patients'
    if (this.state.searchField && this.state.searchText) {
      url = `${url}${url.includes('?') ? '&' : '?'}${this.state.searchField}=${this.state.searchText}`
    }
    if (this.state.sortDirection) {
      url = `${url}${url.includes('?') ? '&' : '?'}sort=${this.state.sortDirection}`
    }
    fetch(url)
      .then(response => response.json())
      .then(patients => this.setState({patients}))
      .catch(err => console.log(err))
  }

  onShowSoftDeletedChanged = () => {
    this.setState({ showSoftDeleted: !this.state.showSoftDeleted })
    setTimeout(() => this.getPatients(), 0)
  }

  onSearchFieldChanged = e => {
    this.setState({ searchField: e.target.value })
  }

  onSortDirectionChanged = e => {
    this.setState({ sortDirection: e.target.value })
  }

  onSearchTextChanged = e => {
    this.setState({ searchText: e.target.value })
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
        <Row style={{margin: "20px 0"}}>
          <Col xs="2">
            <Input type="select" value={this.state.searchField === null ? 'FirstName' : this.state.searchField} onChange={this.onSearchFieldChanged}>
              <option value="FirstName">First Name</option>
              <option value="LastName">Last Name</option>
              <option value="PatientID">PatientID</option>
              <option value="gender">Gender</option>
              <option value="dob">Date of Birth</option>
            </Input>
          </Col>
          <Col xs="2.5">
            <Input type="select" value={this.state.sortDirection === null ? 'desc' : this.state.sortDirection} onChange={this.onSortDirectionChanged}>
              <option value="desc">Descending Sort</option>
              <option value="asc">Ascending Sort</option>
            </Input>
          </Col>
          <Col xs="5">
            <Input type="text" onChange={this.onSearchTextChanged} placeholder='Search content'/>
          </Col>
          <Col xs="2">
            <Button color="primary" onClick={this.getPatients}>Search</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <PatientsTable patients={this.state.patients} updatePatient={this.getPatients} deletePatient={this.getPatients} />
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