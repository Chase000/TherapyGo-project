import React from 'react';
import './ContactUs.scss';
import { FiPhone } from 'react-icons/fi';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';

const ShopDetails = (props) => (
  <div className='details'>
    <h2>Massage Shop Address</h2>
    <p>83 George St, Launceston City</p>
    <h2>Address For Free Parking</h2>
    <p>82 George St, Launceston City</p>
    <h2>Reservation & Inquiry</h2>
    <p>
      If you have other special needs, please contact us during the following periods:
      <br />
      Mon - Fri: 9am - 7pm
      <br />
      Saturday: 9am - 6pm
      <br />
      Sunday: 10am - 5pm
    </p>
    <h2>Contact Information</h2>
    <p>
      <FiPhone className='details__icons__phone' />
      Phone 0406 921 928
    </p>
    <p>
      Follow us on Facebook:
      <IconButton onClick={() => props.navigateToFB()}>
        <FacebookIcon className='details__icons' />
      </IconButton>
    </p>
  </div>
  );

export default ShopDetails;
