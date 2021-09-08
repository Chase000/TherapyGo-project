import React from 'react';
import './Myprofile.scss';
import TopContainer from '../Components/TopContainer';
import UserInformation from '../Components/UserInformationTable/UserInformation';

function MyProfile() {
  return (
    <div className="profile">
      <div className="profile__top">
        <TopContainer />
      </div>
      <div className="profile__body">
        <UserInformation />
      </div>
    </div>
  );
}

export default MyProfile;