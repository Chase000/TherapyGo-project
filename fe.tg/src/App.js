import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import ErrorPage from './pages/ErrorPage/ErrorPage404';
import ErrorPage500 from './pages/ErrorPage/ErrorPage500';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPassword from './pages/LoginPage/ForgetPassword';
import WorksheetPage from './pages/WorksheetPage/WorksheetPage';
import ClientOnePage from './pages/ClientOnePage/ClientOnePage';
import UserProfilePage from './pages/ProfilePage/UserProfile';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import AppointmentForm from './components/newAppointment/AppointmentForm';
import StaffPage from './pages/StaffPage/StaffPage';
import EditForm from './pages/StaffPage/EditForm';
import AddForm from './pages/StaffPage/AddForm';
import ProtectedRoute from './pages/LoginPage/ProtectedRoute';
import Home from './pages/ProfilePage/UserProfilePages/Home';
import History from './pages/ProfilePage/UserProfilePages/History';
import MyProfile from './pages/ProfilePage/UserProfilePages/MyProfile';
import Appointment from './pages/ProfilePage/UserProfilePages/Appointment';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ClientOnePage} />
        <Route path="/LoginPage" exact component={LoginPage} />
        <Route path="/forgetpassword" exact component={ForgotPassword} />
        <Route path="/login" exact component={LoginPage} />
        <ProtectedRoute path="/worksheet" exact component={WorksheetPage} />
        <ProtectedRoute path="/schedule" exact component={SchedulePage} />
        <ProtectedRoute path="/userProfile" exact component={UserProfilePage} />
        <Route path="/newAppointment" exact component={AppointmentForm} />
        <Route path="/staff" exact component={StaffPage} />
        <Route path="/edit/:id" component={EditForm} />
        <Route path="/add" component={AddForm} />
        <Route path="/500" component={ErrorPage500} />
        <Route path="/userProfile" exact component={Home} />
        <Route path="/userProfile/Appointment" component={Appointment} />
        <Route path="/userProfile/History" component={History} />
        <Route path="/userProfile/MyProfile" component={MyProfile} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
