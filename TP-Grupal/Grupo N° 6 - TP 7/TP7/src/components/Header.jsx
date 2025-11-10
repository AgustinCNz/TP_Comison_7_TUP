import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import { useAuthStore } from '../store/auth';

const Header = () => {
  const user = useAuthStore(s => s.user);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Correa-Gym</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#socios">Socios</Nav.Link>
          <Nav.Link href="#actividades">Actividades</Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          {user?.email && <span className="text-light me-3">{user.email}</span>}
          <LogoutButton />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
