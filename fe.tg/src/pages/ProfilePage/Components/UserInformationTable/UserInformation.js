import React, { useEffect, useState } from 'react';
import './UserInformation.scss';
import { TextField, Button } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchUserProfile } from '../../../../store/actions/userProfileActions';
import { updateUserInformation } from '../../../../api/userProfile';
import { theme } from '../../../../colour';

const UserInformation = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const {userInformation} = props;
  const [customerData, setCustomerData] = useState([]);
  const history = useHistory();
  const customerIdls = sessionStorage.getItem('customer_id');

  const payload = { customerId: customerIdls };

  useEffect(() => {
    if (JSON.stringify(userInformation) !== '{}') {
      setCustomerData(userInformation);
    }
  }, [userInformation]);

  const handleChange = (event) => {
    setCustomerData({ ...customerData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInformation(customerData._id, customerData).then((res) => {
      if (res.status === 200) {
        Swal.fire(
          'Information Updated!',
          'The information has been successfully updated.',
          'success',
        );
        history.replace('/userProfile/MyProfile');
        setIsDisabled(!isDisabled);
      } else {
        Swal.fire('Information Update Failed!', 'Update failed. Please try again!', 'error');
      }
      props.fetchUserProfile(payload);
    });
  };

  const handleDisabled = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
    
  };

  return (
    <form className="user-information" onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <ThemeProvider theme={theme}>
        <TextField
          disabled={isDisabled}
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          label="First Name"
          name="firstName"
          value={customerData.firstName || ''}
          onChange={handleChange}
        />
        <TextField
          disabled={isDisabled}
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          label="Last Name"
          name="lastName"
          value={customerData.lastName || ''}
          onChange={handleChange}
        />
        <FormControl variant="outlined" className="selection">
          <InputLabel>Gender</InputLabel>
          <Select native disabled={isDisabled} onChange={handleChange} label="Gender">
            <option aria-label="None" value="" />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
        <TextField
          disabled={isDisabled}
          variant="outlined"
          margin="normal"
          fullWidth
          type="number"
          label="Phone Number"
          name="mobile"
          value={customerData.mobile || ''}
          onChange={handleChange}
        />
        <TextField
          disabled={isDisabled}
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          label="Your Email"
          name="email"
          value={customerData.email || ''}
          onChange={handleChange}
        />
        {isDisabled ? (
          <Button variant="contained" className="button" onClick={handleDisabled}>
            Edit Information
          </Button>
        ) : (
          <Button type="submit" variant="contained" className="button">
            Save Change
          </Button>
        )}
      </ThemeProvider>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { userProfile } = state;
  const { userInformation, orderHistory } = userProfile;
  return {
    userInformation,
    orderHistory,
  };
};

const mapActionsToProps = {
  fetchUserProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(UserInformation);
