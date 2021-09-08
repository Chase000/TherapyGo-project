import React, { useState } from 'react';
import { Row, Col, Form, Container, Card } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../colour';
import config from '../../config/index';
import './AddForm.scss';
import { closeForm } from './CloseForm';

const addUrl = `${config.baseUrl.dev}/addStaff`;

const isCertificated = ['true', 'false'];

const isAvailable = ['true', 'false'];

function AddForm() {
  const [employee, setEmployee] = useState({
    firstName: '',
    isCertificated: false,
    isAvailable: true,
    colour: '#f5f5f5',
    email: '',
    mobile: 0,
    salary: 0,
    tfn: 0,
    superNumber: 0,
  });

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(addUrl, employee).then((res) => {
      if (res.status === 201) {
        Swal.fire('Staff Added!', 'The staff has been successfully added.', 'success').then(
          (result) => {
            if (result.isConfirmed) closeForm();
          },
        );
      } else {
        Swal.fire(
          'Staff Not Added!',
          'There was an error while adding this staff. Please try again!',
          'error',
        ).then((result) => {
          if (result.isConfirmed) closeForm();
        });
      }
    });
  };

  return (
    <div className="add-form">
      <ThemeProvider theme={theme}>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} sm={9}>
              <Card>
                <StyledCardHeader>Add Employee</StyledCardHeader>
                <Card.Body>
                  <Form.Group controlId="addColour">
                    <Form.Label>Colour</Form.Label>
                    <Form.Control
                      required
                      type="color"
                      name="colour"
                      placeholder="Please enter colour"
                      value={employee.colour}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="addName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        placeholder="Please enter staff name"
                        value={employee.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="addEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        placeholder="Please enter email"
                        value={employee.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="addMobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="mobile"
                        placeholder="Please enter mobile"
                        value={employee.mobile}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="addCertificated">
                      <Form.Label>Certificated</Form.Label>
                      <Form.Control
                        required
                        name="isCertificated"
                        as="select"
                        value={employee.isCertificated}
                        onChange={handleChange}
                      >
                        {isCertificated.map((certificated) => (
                          <option key={certificated}>{certificated}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="addAvailable">
                      <Form.Label>Available</Form.Label>
                      <Form.Control
                        required
                        name="isAvailable"
                        as="select"
                        value={employee.available}
                        onChange={handleChange}
                      >
                        {isAvailable.map((available) => (
                          <option key={available}>{available}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="addTfn">
                      <Form.Label>Tfn</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="tfn"
                        placeholder="Please enter tfn"
                        value={employee.tfn}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="addSuperNumber">
                      <Form.Label>SuperNumber</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="superNumber"
                        placeholder="Please enter superNumber"
                        value={employee.superNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="addSalary">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="salary"
                        placeholder="Please enter salary"
                        value={employee.salary}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div className="form-footer">
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                      <Button variant="contained" color="primary" onClick={() => closeForm()}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </div>
  );
}

const StyledCardHeader = styled(Card.Header)`
  background-color: #73d6ca;
  color: #ffffff;
  font-weight: bold;
`;

export default AddForm;
