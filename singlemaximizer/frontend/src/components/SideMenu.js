import React from "react";
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { ReactComponent as Logo } from "../assets/logo.png";
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className="app-sidemenu">
     <img className="sidelogo" src="http://127.0.0.1:8000/media/logo.png"></img>
     <hr></hr><br></br><br></br>
     <Navbar expand="lg">
     <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/"><i className="bi bi-person-fill"></i> PROFILE</Nav.Link></Nav.Item> 
          <Nav.Item><Link to="/single/new"><i className="bi bi-plus-circle-fill"></i> NEW RELEASE</Link></Nav.Item>
          <Nav.Item><Nav.Link href="/"><i className="bi bi-disc"></i> SINGLES</Nav.Link></Nav.Item>
          </Nav>
      
      </Navbar>

    </div>
  );
};

export default SideMenu;
