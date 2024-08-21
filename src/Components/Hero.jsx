import React from "react";
import "../Components/Hero.css";
import logo from "../assets/logo.jpeg";
const Hero = () => {
  return (
    <div className="navbar-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "10px",
          // justifyContent: "space-between",
        }}
      >
        
        <img
          src={logo}
          alt="logo.jpeg"
          style={{ height: "30px", width: "30px" }}
        />
        <span>
          <h2>VTS</h2>
        </span>
        <hr />
      </div>
      <div className="dashLink">
        <p>Overview</p>
      </div>
      <div className="dashLink">
        <p>Shipment</p>
      </div>

      <div className="dashLink">
        <p>Tracking</p>
      </div>

      <div className="dashLink">
        <p>Unit</p>
      </div>

      <div className="dashLink">
        <p>Inventory</p>
      </div>
      <div className="dashLink">
        <p>Setting</p>
      </div>
      <div className="dashLink">
        <p>Help and Support</p>
      </div>
    </div>
  );
};

export default Hero;
