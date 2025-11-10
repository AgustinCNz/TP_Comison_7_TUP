// src/pages/DashboardPage.jsx
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import LogoutButton from '../components/LogoutButton';
import { useAuthStore } from '../store/auth';

const DashboardPage = () => {
  const user = useAuthStore(s => s.user);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ZavaGym</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#socios">Socios</Nav.Link>
            <Nav.Link href="#actividades">Actividades</Nav.Link>
          </Nav>
          <Nav>
            {user?.email && <span className="text-light me-3">{user.email}</span>}
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1>Dashboard</h1>
        <p>Esta es la página principal (privada).</p>
        <p>El contenido (tabla con datos reales) se muestra en las demás vistas.</p>
      </Container>
    </>
  );
};

export default DashboardPage;
