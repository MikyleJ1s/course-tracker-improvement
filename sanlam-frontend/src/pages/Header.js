import React from 'react';
import logo from './sanlam.png'  

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() 


{
  return (

    <>

    <Navbar collapseOnSelect expand="sm" style={{boxShadow: '0px 1px 10px #0075c9'}}>
      <Container>        

        <Navbar.Toggle/>
        <Navbar.Brand href='http://localhost:3000/2/'><img src={logo} alt='logo' width={'200px'}/></Navbar.Brand>

        <Navbar.Collapse>
          <Nav >
          <Nav.Link href="http://localhost:3000/1" style={{border: '2px solid green'}}>Available Rotations</Nav.Link>
            <Nav.Link href="http://localhost:3000/2" style={{border: '2px solid green'}}>Academy Calendar</Nav.Link>

            <Nav.Link href="http://localhost:3000/i" style={{border: '2px solid blue'}}>Edit Rotation Details</Nav.Link>
            <Nav.Link href="http://localhost:3000/ii" style={{border: '2px solid blue'}}>Feedback</Nav.Link>
            
            <Nav.Link href="http://localhost:3000/a" style={{border: '2px solid red'}}>Calendar</Nav.Link>     
            <Nav.Link href="http://localhost:3000/b" style={{border: '2px solid red'}}>Graduates</Nav.Link>           
          </Nav>

        </Navbar.Collapse>
      
      </Container>
      
    </Navbar>
    
    </>
  );
}



export default Header;