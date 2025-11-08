-- Creamos una  BD

CREATE DATABASE IF NOT EXISTS gym_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE gym_db;

-- Tabla usuarios (Esto es para el login y roles)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(225) NOT NULL,
    rol ENUM('admin','user') NOT NULL DEFAULT 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla socios (miembros del GYM)

CREATE TABLE socios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(30),
    plan ENUM('Basico', 'Full') NOT NULL,
    status ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    fecha_ingreso DATE NOT NULL
);

-- Tabla actividades
CREATE TABLE actividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cupo_maximo INT NOT NULL,
  horario VARCHAR(50) NOT NULL,
  dias VARCHAR(120) NOT NULL,
  instructor VARCHAR(100) NOT NULL
);

-- Tabla reservas (core TP7)
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  actividad_id INT NOT NULL,
  fecha_reserva DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('Reservada','Cancelada') NOT NULL DEFAULT 'Reservada',
  CONSTRAINT fk_reserva_socio FOREIGN KEY (socio_id) REFERENCES socios(id) ON DELETE CASCADE,
  CONSTRAINT fk_reserva_actividad FOREIGN KEY (actividad_id) REFERENCES actividades(id) ON DELETE CASCADE
);

-- Usuario admin semilla: admin@test.com / 123456
-- (hash generado con bcryptjs salt=10)
INSERT INTO usuarios (email, password_hash, rol)
VALUES ('admin@test.com', '$2a$10$fVlj.9R0i1C1LZHA24VrjeUHgvvCetG6dPGrxJ2AbJ81DSaNK1FBq', 'admin')
ON DUPLICATE KEY UPDATE email=email;