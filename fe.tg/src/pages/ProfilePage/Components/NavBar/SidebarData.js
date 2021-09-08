import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/userProfile',
    icon: <FaIcons.FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Appointment',
    path: '/userProfile/Appointment',
    icon: <AiIcons.AiFillSchedule />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/userProfile/History',
    icon: <AiIcons.AiOutlineHistory />,
    cName: 'nav-text'
  },
  {
    title: 'My profile',
    path: '/userProfile/MyProfile',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  }
];

export default { SidebarData }