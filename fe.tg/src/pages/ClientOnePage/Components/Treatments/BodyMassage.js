import React from 'react';
import './BodyMassage.scss';
import pic1 from '../../../../assets/images/Treatment1.jpg';
import pic2 from '../../../../assets/images/Treatment2.jpg';
import pic3 from '../../../../assets/images/Treatment3.jpg';
import pic4 from '../../../../assets/images/Treatment4.jpg';
import MiddleBreak from '../DecorativeElements/MiddleBreak';

const BodyMassage = (props) => {
  const { treatmentL } = props;

  const renderTreatments = (num) => {
    if (treatmentL.length > 0) {
      const result = [];
      let i = 0;
      for (i = 0; i < treatmentL.length; i += 1) {
        const { treatment, treatmentPackage } = treatmentL[i];
        if (treatmentPackage === num) {
          result.push(treatment);
        }
      }
      return result.map((treatment, index) => (
        <tr key={index}>
          <td>{treatment}</td>
        </tr>
        ));
    }
    return null;
  };

  return (
    <div className="treatment-container">
      <h1>Body Massage</h1>
      <MiddleBreak />
      <h2>Dry Style / Oil Style / Deep Tissue</h2>

      <div className="card-outter">
        <div className="card-outter__picture-right">
          <img className="card-img" src={pic1} alt="card" />
        </div>
        <div className="card-outter__card-left">
          <h3>20 min - $20 / $30 / $35</h3>
          <MiddleBreak />
          <table className="card-outter__details">
            <tbody>{renderTreatments(10)}</tbody>
          </table>
        </div>
      </div>

      <div className="card-outter">
        <div className="card-outter__picture-left">
          <img className="card-img" src={pic2} alt="card" />
        </div>
        <div className="card-outter__card-right">
          <h3>30 min - $30 / $40 / $50</h3>
          <MiddleBreak />
          <table className="card-outter__details">
            <tbody>{renderTreatments(20)}</tbody>
          </table>
        </div>
      </div>

      <div className="card-outter">
        <div className="card-outter__picture-right">
          <img className="card-img" src={pic3} alt="card" />
        </div>
        <div className="card-outter__card-left">
          <h3>45 min - $45 / $55 / $65</h3>
          <MiddleBreak />
          <table className="card-outter__details">
            <tbody>{renderTreatments(30)}</tbody>
          </table>
        </div>
      </div>

      <div className="card-outter">
        <div className="card-outter__picture-left">
          <img className="card-img" src={pic4} alt="card" />
        </div>
        <div className="card-outter__card-right">
          <h3>60 min - $60 / $70 / $80</h3>
          <MiddleBreak />
          <table className="card-outter__details">
            <tbody>{renderTreatments(40)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BodyMassage;
