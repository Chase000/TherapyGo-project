import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  FormControl,
  FormGroup,
  Checkbox,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';
import closeIcon from "../../assets/images/x-circle.svg";
import Select from './Select';
import {
  getTherapist,
  getDefaultPrice,
  getBodyPartsAndDurationData,
  submit,
} from '../../api/newAppointment-api';
import "./AppointmentForm.scss";
import BookingConfirm 
  from '../../pages/WorksheetPage/Components/Worksheet/Components/BookingConfirm';
import { theme } from '../../colour';

const AppointmentForm = (props) => {
  const { startDate, startTime, roomId, refreshPage } = props;
  const initialValues = {
    date: startDate,
    time: startTime,
    roomName: roomId,
    firstName: '',
    mobile: '',
    treatmentStyle: '',
    bodyPartsAndDuration: '',
    therapistName: '',
    paymentAmount: '',
    paymentMethod: [],
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
    paymentMethod,
  } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [therapistOptions, setTherapistOptions] = useState([]);
  const [optionsOfBodyPartsAndDuration, setOptionsOfBodyPartsAndDuration] = useState([]);
  const optionsOfTreatmentStyle = ['Dry', 'Oil', 'Deep Tissue'];

  const fetchTherapist = () => {
    getTherapist(date, time, bodyPartsAndDuration).then((data) => setTherapistOptions([...data]));
  };

  const fetchBodyParts = () => {
    getBodyPartsAndDurationData(date, time, therapistName, roomName).then((list) =>
      setOptionsOfBodyPartsAndDuration([...list]),
    );
  };

  const fetchPrice = () => {
    if (treatmentStyle !== '') {
      let treatmentBodyPart = '';
      let treatmentDuration = '';
      if (bodyPartsAndDuration && bodyPartsAndDuration !== 'None') {
        const parts = bodyPartsAndDuration.split('--');
        treatmentBodyPart = parts[0];
        treatmentDuration = parts[1].split(' ')[0];
        getDefaultPrice(treatmentBodyPart, treatmentDuration, treatmentStyle).then((price) =>
          setValues({ ...values, paymentAmount: price }),
        );
      }
    } else {
      Swal.fire({
        title: 'Please select Service Type!',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleCheck = (e) => {
    let data = new Set(paymentMethod);
    if (e.target.checked) {
      data.add(e.target.value);
    } else {
      data.delete(e.target.value);
    }
    data = [...data];
    setValues({ ...values, paymentMethod: data });
  };

  const changeVisibility = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('appointPage'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTime = values.time.slice(0, 5);
    const newValues = { ...values, time: newTime };
    const role = 'staff';
    submit(newValues, role).then((code) => {
      if (code === 200) {
        refreshPage({ date: startDate });
        ReactDOM.unmountComponentAtNode(document.getElementById('appointPage'));
        ReactDOM.hydrate(<BookingConfirm data={newValues} />, document.getElementById('alertPage'));
        setTimeout(
          () => ReactDOM.unmountComponentAtNode(document.getElementById('alertPage')),
          1000,
        );
      }
    });
  };

  return (
    <div className="popupContainer">
      <ThemeProvider theme={theme}>
        <div className="popupContainer-header">
          <FormLabel>
            <p>New Appointment</p>
          </FormLabel>
          <IconButton className="IconButton" size="small" onClick={changeVisibility}>
            <img src={closeIcon} alt="close button" />
          </IconButton>
        </div>
        <div className="popupContainer-body">
          <form onSubmit={handleSubmit} className="popupContainer-body__form">
            <div className="popupContainer-body__form--01">
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Time"
                    name="time"
                    type="time"
                    value={time}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>

            <div className="popupContainer-body__form--02">
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <TextField
                      label="Room"
                      name="roomName"
                      value={roomName}
                      onChange={handleChange}
                      variant="outlined"
                      disabled
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      label="Service Type"
                      name="treatmentStyle"
                      value={treatmentStyle}
                      onChange={handleChange}
                      options={optionsOfTreatmentStyle}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      label="Body Parts"
                      name="bodyPartsAndDuration"
                      value={bodyPartsAndDuration}
                      onChange={handleChange}
                      onFocus={fetchBodyParts}
                      onBlur={fetchPrice}
                      options={optionsOfBodyPartsAndDuration}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>

            <div className="popupContainer-body__form--03">
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Select
                      label="Therapist"
                      name="therapistName"
                      value={therapistName}
                      onFocus={fetchTherapist}
                      onChange={handleChange}
                      options={therapistOptions}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Price"
                    name="amount"
                    value={paymentAmount}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>

            <div className="popupContainer-body__form--04">
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Customer Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
          </form>
          <div className="popupContainer-bottom">
            <div className="popupContainer-bottom--01">
              <FormControl>
                <FormLabel>
                  <p>Payment Method</p>
                </FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox value="card" onChange={handleCheck} name="card" />}
                    label={(
                      <div>
                        <h4>Card</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox value="cash" onChange={handleCheck} name="cash" />}
                    label={(
                      <div>
                        <h4>Cash</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox value="healthFund" onChange={handleCheck} name="healthFund" />
                    }
                    label={(
                      <div>
                        <h4>Health Fund</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox value="voucher" onChange={handleCheck} name="voucher" />}
                    label={(
                      <div>
                        <h4>Voucher</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={<Checkbox value="discount" onChange={handleCheck} name="discount" />}
                    label={(
                      <div>
                        <h4>Discount</h4>
                      </div>
                    )}
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="popupContainer-bottom--02">
              <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default AppointmentForm;
