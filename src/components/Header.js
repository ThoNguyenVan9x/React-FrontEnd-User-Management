import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    Basic-App
                    <img src={logoApp} width="30px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={location.pathname}>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>

                        <NavLink className="nav-link" to="/users">
                            Manage User
                        </NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={<i className="fa-solid fa-user"></i>}
                            id="basic-nav-dropdown"
                        >
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>

                            <NavLink className="nav-link" to="/logout">
                                Logout
                            </NavLink>
                            {/* <NavDropdown.Item href="/login">
                                Login
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/logout">
                                Logout
                            </NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
