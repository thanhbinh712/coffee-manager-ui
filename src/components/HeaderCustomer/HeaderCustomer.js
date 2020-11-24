import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const HeaderCustomer = () => {
  return (
    <React.Fragment>
      <Navbar width="100vh" variant="dark" bg="dark">
        <Navbar.Brand href="#">90s Coffee</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Giới thiệu</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Đăng Nhập</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/images/ca_phe_moka_nguyen_chat.jpg"
            alt="First Image"
            style={{ height: "70vh" }}
          />
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>Scenery 1</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/images/slider_4.png"
            alt="Second Image"
            style={{ height: "70vh" }}
          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Scenery 2</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/images/lam-ca-phe-slider-03.jpg"
            alt="Third Image"
            style={{ height: "70vh" }}
          />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>Scenery 3</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </React.Fragment>
  );
};

export default HeaderCustomer;
