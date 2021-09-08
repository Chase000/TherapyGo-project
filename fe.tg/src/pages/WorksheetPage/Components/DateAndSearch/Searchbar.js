import React, { useState } from 'react';
import './Searchbar.scss';
import Swal from 'sweetalert2';
import searchIcon from '../../../../assets/images/search.svg';
import { getUserNearestAppointment } from '../../../../api/worksheet';

const Searchbar = () => {
  const [mobileNumber, setMobileNumber] = useState();

  const handleChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      getUserNearestAppointment(mobileNumber).then((res) => {
        const { code, message } = res.data;
        if (code === 200) {
          Swal.fire('Appointment Found!', `${message}`, 'success');
        } else {
          Swal.fire('No Appointment Found!', `${message}`, 'error');
        }
      });
    }
  };

  return (
    <div className="searchbar">
      <img src={searchIcon} alt="searchIcon" className="searchbar__icon" />
      <input
        type="number"
        name="mobile"
        placeholder="Search by customer phone ..."
        className="searchbar__input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Searchbar;
