import React, { useState, useEffect } from 'react';
import './StaffListSection.scss';
import { connect } from 'react-redux';

const StaffListSection = (props) => {
  const [staffL, setStaffL] = useState([]);
  const { staffList } = props;

  useEffect(() => {
    setStaffL(staffList);
  }, [staffList]);

  const renderStaffList = () => {
    if (staffL.length > 0) {
      return staffL.map((staff) => {
        const { firstName, color } = staff;
        return (
          <tr className="main-staff__staff" key={color}>
            <td>
              <div className="main-staff__staff__colour" style={{ backgroundColor: color }} />
            </td>
            <td>{firstName}</td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td>Staff List Unavailable!</td>
      </tr>
    );
  };

  return (
    <table className="main-staff">
      <thead>
        <tr>
          <th>Staff List</th>
        </tr>
      </thead>
      <tbody>{renderStaffList()}</tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  const { workSheet } = state;
  const { staffList, existAppointment } = workSheet;
  return {
    staffList,
    existAppointment,
  };
};

export default connect(mapStateToProps)(StaffListSection);
