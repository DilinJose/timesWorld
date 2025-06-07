import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store/store';
import { getAllCountriesByRegion } from '../../../redux/slice/countrySlice';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeIndex, setActiveIndex] = useState(0); // track selected item

  const handleFilter = (id: number) => {
    setActiveIndex(id); // update selected state
    switch (id) {
      case 0:
        dispatch(getAllCountriesByRegion('all'));
        break;
      case 1:
        dispatch(getAllCountriesByRegion('asia'));
        break;
      case 2:
        dispatch(getAllCountriesByRegion('europe'));
        break;
      default:
        dispatch(getAllCountriesByRegion('all'));
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-white">
      <Container>
        <Navbar.Brand href="#home">Countries</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {['All', 'Asia', 'Europe'].map((item, index) => (
              <Nav.Link
                key={index}
                onClick={() => handleFilter(index)}
                className={`px-3 ${activeIndex === index ? 'border-bottom border-dark fw-bold' : ''}`}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
