import React, { useEffect, useState } from 'react';
import './TopContainer.scss';
import { connect } from 'react-redux';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MiddleBreak from './DecorativeElements/MiddleBreak';

function TopContainer(props) {
  const {userInformation} = props;
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    if (JSON.stringify(userInformation) !== '{}') {
      setCustomerData(userInformation);
    }
  }, [userInformation]);

  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <div className="Top-contain">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css"
      />
      <div className="Top-contain__information">
        <div className="Top-contain__information__text">
          <h1>
            Welcome Back,
            {customerData.firstName}
          </h1>
        </div>
        <a href="/" className="Top-contain__information__logout">
          <ExitToAppRoundedIcon 
            onClick={logout} 
            className="Top-contain__information__logout__icon" 
          />
        </a>
      </div>
      <MiddleBreak />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userProfile } = state;
  const { userInformation, orderHistory } = userProfile;
  return {
    userInformation,
    orderHistory,
  };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(TopContainer);
