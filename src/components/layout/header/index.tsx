import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-white">
      <Container>
        <Navbar.Brand href="#home">Countries</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="#features">All</Nav.Link>
            <Nav.Link href="#features">Asia</Nav.Link>
            <Nav.Link href="#features">Europe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header