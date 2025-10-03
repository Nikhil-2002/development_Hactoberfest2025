import { Typography } from "@material-ui/core";
import React from "react";
//import { Link } from 'react-router-dom';
//import styled from 'styled-components';

function Footer() {
  //export default class Footer extends React.Components {

  return (
    <div style={{ color: "white" }}>
      <Typography
        style={{
          backgroundColor: "black",
          textAlign: "center",
          padding: "2rem",
          fontSize: "0.9rem",
        }}
      >
        &copy; 2023 SwiftCart
      </Typography>
    </div>
  );
}
export default Footer;
