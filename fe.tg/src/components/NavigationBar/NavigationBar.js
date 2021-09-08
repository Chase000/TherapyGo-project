import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.scss';
import { useHistory } from 'react-router-dom';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Badge from '@material-ui/core/Badge';
import Swal from 'sweetalert2';
import Logo from '../../assets/images/Logo.png';
import { getAllNotification, markAllNotificationAsRead } from '../../api/worksheet';

const NavigationBar = () => {
  const currentRoute = useHistory().location.pathname.toLowerCase();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);

  const getNotificationCount = () => {
    let i;
      let count = 0;
    for (i = 0; i < notificationList.length; i += 1) {
      if (notificationList[i].new === true) {
        count += 1;
      }
    }
    setNotificationCount(count);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getAllNotification().then((res) => setNotificationList(res));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getNotificationCount();
  }, [notificationList]);

  const setAllAsRead = () => {
    setNotificationCount(0);
    let i;
    for (i = 0; i < notificationList.length; i += 1) {
      if (notificationList[i].new === true) {
        notificationList[i].new = false;
      }
    }
    markAllNotificationAsRead().then((status) => {
      if (status === 200) {
        setNotificationList(notificationList);
      } else {
        Swal.fire(
          'Fail to set all to read',
          'There was an error while conducting this action. Please try again.',
          'error',
        );
      }
    });
  };

  const renderNotification = () => notificationList
      .map((notification, index) => (
        <List key={index}>
          {index === notificationList.length - 1 ? (
            <button type="button" className="mainNavBar__mark-all" onClick={setAllAsRead}>
              Mark All As Read
            </button>
            ) : (
              ''
            )}
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="action" src={notification.image} />
            </ListItemAvatar>
            <ListItemText
              primary={notification.message}
              secondary={<>{notification.receivedTime}</>}
            />
            {notification.new ? <div className="mainNavBar__status" /> : ''}
          </ListItem>
          {index === 0 ? '' : <Divider variant="inset" component="li" />}
        </List>
        ))
      .reverse();

  const handleClick = (event) => {
    renderNotification();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    history.push('/');
    sessionStorage.clear();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const role = sessionStorage.getItem('role');

  return (
    <Navbar bg="light" variant="light" className="mainNavBar">
      <Navbar.Brand href="/" className="mainNavBar__company-name">
        <img alt="" src={Logo} className={('d-inline-block align-top', 'mainNavBar__logo')} />
        TherapyGo
      </Navbar.Brand>
      <Nav className="mainNavBar__navBar">
        {role.includes('boss') ? (
          <Nav.Link
            href="/staff"
            className={currentRoute.includes('staff') ? 'mainNavBar__navIsCurrent' : ''}
          >
            Staff
          </Nav.Link>
        ) : (
          ''
        )}
        <Nav.Link
          href="/worksheet"
          className={currentRoute.includes('worksheet') ? 'mainNavBar__navIsCurrent' : ''}
        >
          Worksheet
        </Nav.Link>
        <Nav.Link
          href="/schedule"
          className={currentRoute.includes('schedule') ? 'mainNavBar__navIsCurrent' : ''}
        >
          Schedule
        </Nav.Link>
      </Nav>
      <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClick}>
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {open ? <div className="mainNavBar__notification">{renderNotification()}</div> : ''}
      </Popover>
      <IconButton
        className="mainNavBar__logOutButton"
        onClick={logout}
      >
        <ExitToAppRoundedIcon />
      </IconButton>
    </Navbar>
  );
};

export default NavigationBar;
