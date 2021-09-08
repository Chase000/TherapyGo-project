import './UserProfile.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Components/NavBar/Navbar';
import Home from './UserProfilePages/Home';
import History from './UserProfilePages/History';
import MyProfile from './UserProfilePages/MyProfile';
import Appointment from './UserProfilePages/Appointment';
import { fetchUserProfile, fetchOrderHistory } from '../../store/actions/userProfileActions';
import ClientOnePage from "../ClientOnePage/ClientOnePage";

function UserProfile(props) {
  const [sidebar, setSidebar] = useState(true);
  const customerIdls = sessionStorage.getItem('customer_id');
  const payload = { customerId :customerIdls};
  const { fetchOrderHistoryAction, fetchUserProfileAction } = props;
  fetchUserProfileAction(payload);
  fetchOrderHistoryAction(payload);

  return (
    <div className="profile-page">
      <Router>
        <div className={`profile-page${sidebar ? '__big-navbar' : '__small-navbar'}`}>
          <Navbar onChange={setSidebar} value={sidebar} />
        </div>
        <div className={`profile-page${sidebar ? '__body' : '__full-body'}`}>
          <Switch>
            <Route path="/userProfile" exact component={Home} />
            <Route path="/userProfile/Appointment" component={Appointment} />
            <Route path="/userProfile/History" component={History} />
            <Route path="/userProfile/MyProfile" component={MyProfile} />
            <Route path="/" exact component={ClientOnePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = () => {};

const mapActionsToProps = {
  fetchUserProfileAction : fetchUserProfile,
  fetchOrderHistoryAction : fetchOrderHistory,
};

export default connect(mapStateToProps, mapActionsToProps)(UserProfile);
