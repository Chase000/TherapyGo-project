import React, { useState, useEffect } from 'react';
import './ClientOnePage.scss';
import AboutUs from './Components/AboutUs/AboutUs';
import BodyMassage from './Components/Treatments/BodyMassage';
import { getAllTreatment } from '../../api/clientTreatments';
import TopNavigation from './Components/TopNavigation/TopNavigation';
import HamburgerMenu from './Components/TopNavigation/HamburgerMenu';
import HomeCover from './Components/Home/HomeCover';
import HealthFunds from './Components/HealthFunds/HealthFunds';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';
import Booking from './Components/Booking/Booking';

function ClientOnePage() {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [treatmentsL, setTreatmentsL] = useState([]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchTreatmentsList() {
      const list = await getAllTreatment();
      setTreatmentsL(list);
    }
    fetchTreatmentsList();
  },[]);

  return (
    <div className="client">
      {windowDimensions.width > 1127 ? (
        <div className="client-navigationBar">
          <TopNavigation />
        </div>
      ) : (
        <HamburgerMenu />
      )}
      <div id="pos-homecover"> </div>
      <div className="client-content">
        <div className="client-content__home">
          <HomeCover />
        </div>
        <div className="client-content__aboutus">
          <AboutUs />
        </div>
        <div id="pos-treatments"> </div>
        <div className="client-content__separation"> </div>
        <div className="client-content__treatments">
          <BodyMassage treatmentL={treatmentsL} />
        </div>
        <div id="pos-booking"> </div>
        <div className="client-content__separation"> </div>
        <div className="client-content__booking">
          <Booking />
        </div>
        <div id="pos-healthfunds"> </div>
        <div className="client-content__separation"> </div>
        <div className="client-content__healthfunds">
          <HealthFunds />
        </div>
        <div id="pos-contactus"> </div>
        <div className="client-content__separation"> </div>
        <div className="client-content__contactus">
          <ContactUs />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ClientOnePage;
