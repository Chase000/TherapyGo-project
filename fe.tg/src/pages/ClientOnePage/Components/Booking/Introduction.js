import React from 'react';
import './Introduction.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faPhoneSquareAlt, faClock } from '@fortawesome/free-solid-svg-icons';

function Introduction() {
  return (
    <div>
      <div className="IntroductionContainer">
        <div className="IntroductionContainer-title">
          <h2>Have a Question?</h2>
        </div>
        <div className="IntroductionContainer-content">
          <div className="IntroductionContainer-content--01">
            <div className="IntroductionContainer-content--01__icon">
              <FontAwesomeIcon icon={faPhoneSquareAlt} color="#73d6ca" size="2x" />
              &nbsp;
            </div>
            <div className="IntroductionContainer-content--01__text">
              <p>
                Phone: 0406 921 928 Feel free to ask any question or make an appointment over the
                phone.
              </p>
            </div>
          </div>
          <div className="IntroductionContainer-content--02">
            <div className="IntroductionContainer-content--02__icon">
              <FontAwesomeIcon icon={faAddressBook} color="#73d6ca" size="2x" />
            </div>
            <div className="IntroductionContainer-content--02__text">
              <p> Contact us if you have any special need before you make an appointment.</p>
            </div>
          </div>
          <div className="IntroductionContainer-content--03">
            <div className="IntroductionContainer-content--03__icon">
              <FontAwesomeIcon icon={faClock} color="#73d6ca" size="2x" />
              &nbsp;
            </div>
            <div className="IntroductionContainer-content--03__text">
              <p>
                Working hours: Mon - Fri: 9 A.M. - 7 P.M. / Saturday: 9 A.M. - 6 P.M. / Sunday: 10
                A.M. - 5 P.M.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
