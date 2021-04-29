// .jsx is the standard filename extension for React Components
// always name your components starting with a capital letter (PascalCase)

// a functional component is just an arrow function returning JSX

import { Navbar, Nav } from 'react-bootstrap'

const MyNavBar = (props) => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">{props.title} - Strive For Food</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link>Menu</Nav.Link>
                <Nav.Link>Reservations</Nav.Link>
                <Nav.Link>Contact us</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default MyNavBar