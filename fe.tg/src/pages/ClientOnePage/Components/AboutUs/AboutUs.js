import React from 'react';
import './AboutUs.scss';
import MiddleBreak from '../DecorativeElements/MiddleBreak';
import img01 from "../../../../assets/images/img01.jpg";
import img02 from "../../../../assets/images/img02.jpg";
import img03 from "../../../../assets/images/img03.jpg";
import img04 from "../../../../assets/images/img04.jpg";

function AboutUs() {
  return (
    <div className="AboutInformationContainer">
      <div id="pos-aboutus">&emsp;</div>
      <div className="AboutUsContainer">
        <h1>About Us</h1>
        <MiddleBreak />
        <div className="AboutUsContainer-welcome">
          <div className="AboutUsContainer-welcome__title">Welcome to TherapyGo</div>
          <div className="AboutUsContainer-welcome__text">
            At TherapyGo we provide different kinds of massage, our commitment is:
            <br />
            <br />
            <b>
              “Breathe in peace, breathe out stress. Relaxing can bring relief to much of what ails
              you. In our stressful and often negative world, your decision to make relaxing a
              priority will help you navigate, handle, and minimize stress”
            </b>
          </div>
        </div>
      </div>
      <div className="GalleryContainer">
        <h1>Gallery</h1>
        <MiddleBreak />
        <p>Enjoy different kinds of massage and relax.</p>
        <div className="GalleryContainer-photos">
          <div className="GalleryContainer-photos__firstline">
            <img src={img01} alt="candle" />
            <img src={img02} alt="towel" />
          </div>
          <div className="GalleryContainer-photos__secondline">
            <img src={img03} alt="essential oil" />
            <img src={img04} alt="salt" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
