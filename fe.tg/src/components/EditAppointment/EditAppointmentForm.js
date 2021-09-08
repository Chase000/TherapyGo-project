import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
import { ThemeProvider } from '@material-ui/core/styles';
import closeIcon from "../../assets/images/x-circle.svg";
import Select from './Select';
import {
  getTherapist,
  getBodyPartsAndDurationData,
  deleteService,
} from '../../api/updateAppointment-api';
import { getDefaultPrice, updateSubmit } from '../../api/newAppointment-api';
import './EditAppointmentForm.scss';
import BookingConfirm from 
'../../pages/WorksheetPage/Components/Worksheet/Components/BookingConfirm';
import DeleteConfirm from '../../pages/WorksheetPage/Components/Worksheet/Components/DeleteConfirm';
import { theme } from '../../colour';

const EditAppointmentForm = (props) => {
  const {
    startDate,
    startTime,
    roomId,
    refreshPage,
    serviceId,
    bodyParts,
    serviceType,
    therapist,
    mobileNumber,
    customerName,
    treatmentPrice,
    paymentType,
  } = props;

  const initialValues = {
    date: startDate,
    time: startTime,
    roomName: roomId,
    firstName: customerName,
    mobile: mobileNumber,
    treatmentStyle: serviceType,
    bodyPartsAndDuration: bodyParts,
    therapistName: therapist,
    paymentAmount: treatmentPrice,
    paymentMethod: paymentType,
  };

  const [values, setValues] = useState(initialValues);
  const [therapistOptions, setTherapistOptions] = useState([therapist]);
  const [optionsOfBodyPartsAndDuration, setOptionsOfBodyPartsAndDuration] = useState([bodyParts]);
  const optionsOfTreatmentStyle = ['Dry', 'Oil', 'Deep Tissue'];
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

  const fetchTherapist = () => {
    getTherapist(date, time, bodyPartsAndDuration, serviceId).then((data) => {
      data.push(therapist.toString());
      setTherapistOptions([...data]);
    });
  };

  const fetchBodyParts = () => {
    getBodyPartsAndDurationData(date, time, therapistName, roomName, serviceId).then((list) =>
      setOptionsOfBodyPartsAndDuration([...list]),
    );
  };

  const fetchPrice = () => {
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
    updateSubmit(newValues, serviceId).then((res) => {
      if (res.status === 200) {
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

  const handleDelete = (e) => {
    e.preventDefault();
    const role = 'staff';
    deleteService(serviceId, role).then((res) => {
      if (res.status === 200) {
        refreshPage({ date: startDate });
        ReactDOM.unmountComponentAtNode(document.getElementById('appointPage'));
        ReactDOM.hydrate(<DeleteConfirm />, document.getElementById('alertPage'));
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
            <p>Edit Appointment</p>
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
                      disabled
                      onChange={handleChange}
                      variant="outlined"
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
                    disabled
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
                    control={(
                      <Checkbox
                        value="card"
                        checked={!!paymentMethod.includes('card')}
                        onChange={handleCheck}
                        name="card"
                      />
                    )}
                    label={(
                      <div>
                        <h4>Card</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value="cash"
                        checked={!!paymentMethod.includes('cash')}
                        onChange={handleCheck}
                        name="cash"
                      />
                    )}
                    label={(
                      <div>
                        <h4>Cash</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value="healthFund"
                        checked={!!paymentMethod.includes('healthFund')}
                        onChange={handleCheck}
                        name="healthFund"
                      />
                    )}
                    label={(
                      <div>
                        <h4>Health Fund</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value="voucher"
                        checked={!!paymentMethod.includes('voucher')}
                        onChange={handleCheck}
                        name="voucher"
                      />
                    )}
                    label={(
                      <div>
                        <h4>Voucher</h4>
                      </div>
                    )}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        value="discount"
                        checked={!!paymentMethod.includes('discount')}
                        onChange={handleCheck}
                        name="discount"
                      />
                    )}
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
              <Button variant="contained" color="primary" type="submit" onClick={handleDelete}>
                Delete
              </Button>
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

export default EditAppointmentForm;
