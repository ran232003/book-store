import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Components.css";
import { bookAction } from "../store/booksSlice";
function TabBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  console.log(user);
  if (user) {
    const handleTabClick = (status) => {
      console.log(status);
      dispatch(bookAction.setUrlStatus(status));
    };
    return (
      <Container className="test">
        <Row className="justify-content-center">
          <Col md="5">
            <Nav variant="pills" defaultActiveKey="">
              <Nav.Item>
                <Nav.Link eventKey="link-1">Sign Out</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleTabClick("Cards")}
                  eventKey="link-2"
                  as={Link}
                  to="/homepage/cards"
                >
                  Cards
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => handleTabClick("Table")}
                  eventKey="disabled"
                  as={Link}
                  to="/homepage/table"
                >
                  Table
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <Nav variant="pills" defaultActiveKey="">
              <Nav.Item>
                <Nav.Link as={Link} to="/auth/login" eventKey="link-1">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/auth/signup" eventKey="link-2">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TabBar;
