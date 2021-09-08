import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Card } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../colour';
import config from '../../config/index';
import './AddForm.scss';
import { closeForm } from './CloseForm';

const url = `${config.baseUrl.dev}`;

const isCertificated = ['true', 'false'];

const isAvailable = ['true', 'false'];

function EditForm(props) {
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

  useEffect(() => {
    axios.get(`${url}/getStaff/${props.match.params.id}`).then((response) => {
      setEmployee(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${url}/updateStaff/${props.match.params.id}`, employee).then((res) => {
      if (res.status === 200) {
        Swal.fire('Staff Edited!', 'The staff has been successfully edited.', 'success').then(
          (result) => {
            if (result.isConfirmed) closeForm();
          },
        );
      } else {
        Swal.fire(
          'Edit Failed!',
          "There was an error while updating this staff's data. Please try again!",
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
                <StyledCardHeader>Edit Employee</StyledCardHeader>
                <Card.Body>
                  <Form.Group controlId="editColour">
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
                    <Form.Group controlId="editName">
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
                    <Form.Group controlId="editEmail">
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
                    <Form.Group controlId="editMobile">
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
                    <Form.Group controlId="editCertificated">
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
                    <Form.Group controlId="editAvailable">
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
                    <Form.Group controlId="editTfn">
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
                    <Form.Group controlId="editSuperNumber">
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
                    <Form.Group controlId="editSalary">
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
                      <Button
                        variant="contained"
                        className="style-button"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        align="flex-end"
                        onClick={() => closeForm()}
                      >
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

export default EditForm;
