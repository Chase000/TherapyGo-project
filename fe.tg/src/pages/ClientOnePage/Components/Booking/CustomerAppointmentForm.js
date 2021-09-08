import React, { useState, memo, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { theme } from '../../../../colour';
import Select from '../../../../components/newAppointment/Select';
import './timeList.scss';
import {
  getTherapist,
  getDefaultPrice,
  getBodyPartsAndDurationData,
  submit,
} from '../../../../api/newAppointment-api';
import apiKeys from '../../../../config/apiKeys';

const CustomerAppointmentForm = memo((props) => {
  const [myDate, startTime, room] = props.data;
  const { cancelModal } = props;
  const initialValues = {
    date: myDate,
    time: startTime,
    roomName: room,
    firstName: '',
    mobile: '',
    treatmentStyle: '',
    bodyPartsAndDuration: '',
    therapistName: '',
    paymentAmount: '',
  };
  const [values, setValues] = useState(initialValues);
  const {
    date,
    time,
    roomName,
    firstName,
    mobile,
    treatmentStyle,
    bodyPartsAndDuration,
    therapistName,
    paymentAmount,
  } = values;
  const [therapistOptions, setTherapistOptions] = useState([]);
  const [optionsOfBodyPartsAndDuration, setOptionsOfBodyPartsAndDuration] = useState([]);
  const optionsOfTreatmentStyle = ['Dry', 'Oil', 'Deep Tissue'];

  useEffect(() => {
    setValues({ ...values, roomName: room });
  }, [room]);

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchTherapist = (e) => {
    e.stopPropagation();
    getTherapist(date, time, bodyPartsAndDuration)
      .then((data) => setTherapistOptions([...data]))
      .catch((error) => {
        throw new Error(`Customer Appointment Form - fetch therapist ${error}`);
      });
  };

  const fetchBodyParts = (e) => {
    e.stopPropagation();
    getBodyPartsAndDurationData(date, time, therapistName, roomName)
      .then((list) => setOptionsOfBodyPartsAndDuration([...list]))
      .catch((error) => {
        throw new Error(`Customer Appointment Form - fetch body parts ${error}`);
      });
  };

  const fetchPrice = (e) => {
    e.stopPropagation();
    let treatmentBodyPart = '';
    let treatmentDuration = '';
    if (bodyPartsAndDuration) {
      const parts = bodyPartsAndDuration.split('--');
      treatmentBodyPart = parts[0];
      treatmentDuration = parts[1].split(' ')[0];
    }
    getDefaultPrice(treatmentBodyPart, treatmentDuration, treatmentStyle)
      .then((price) => setValues({ ...values, paymentAmount: price }))
      .catch((error) => {
        throw new Error(`Customer Appointment Form - get default price ${error}`);
      });
  };

  const handleCancel = () => {
    Swal.fire('Cancel Booking?', 'The booking data will not record. Are you sure?', 'error').then(
      (result) => {
        if (result.isConfirmed) {
          cancelModal(false);
        }
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = 'customer';
    submit(values, role).then((res) => {
      if (res.code === 200) {
        const templateParams = {
          name: values.firstName,
          email: res.email,
          date: values.date,
          time: values.time,
          treatment: values.treatmentStyle,
        };
        if (res.email !== '' && res.email !== undefined) {
          emailjs
            .send(
              apiKeys.emailjs.serviceId,
              apiKeys.emailjs.templateId,
              templateParams,
              apiKeys.emailjs.userId,
            )
            .then((response) => {
              if (response.status === 200) {
                Swal.fire(
                  'Book Successfully!',
                  'The confirmation has been sent to your email.',
                  'success',
                ).then((result) => {
                  if (result.isConfirmed) cancelModal(false);
                });
              } else {
                Swal.fire(
                  'Confirmation Failed To Send!',
                  'Please contact our shop for further details.',
                  'error',
                );
              }
            });
        } else {
          Swal.fire('Book Successfully!', 'Thank you for booking with us.', 'success').then(
            (result) => {
              if (result.isConfirmed) cancelModal(false);
            },
          );
        }
      } else {
        Swal.fire('Book Failed!', 'Error. Please Try Again...', 'error');
      }
    });
  };

  return (
    <div className="appointment-form-modal" onMouseDown={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <h3>book an appointment</h3>
        <p>Please confirm that you would like to request the following appointment:</p>
        <div>
          <ThemeProvider theme={theme}>
            <TextField
              required
              className="input"
              label="Date"
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              className="input"
              label="Start Time"
              name="time"
              type="time"
              value={time}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Select
              required
              label="Body Parts"
              name="bodyPartsAndDuration"
              value={bodyPartsAndDuration}
              onChange={handleChange}
              onFocus={fetchBodyParts}
              options={optionsOfBodyPartsAndDuration}
            />
            <Select
              required
              label="Service Type"
              name="treatmentStyle"
              value={treatmentStyle}
              onChange={handleChange}
              onBlur={fetchPrice}
              options={optionsOfTreatmentStyle}
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Select
              required
              label="Therapist"
              name="therapistName"
              value={therapistName}
              onFocus={fetchTherapist}
              onChange={handleChange}
              options={therapistOptions}
            />
            <TextField
              required
              label="Price"
              name="paymentAmount"
              value={paymentAmount}
              onChange={handleChange}
              variant="outlined"
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <TextField
              required
              label="Customer Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              required
              label="Mobile"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              variant="outlined"
            />
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={
                therapistOptions.length === 0 || therapistOptions[0] === 'None' ? true : false
              }
            >
              Submit
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
});

export default CustomerAppointmentForm;
