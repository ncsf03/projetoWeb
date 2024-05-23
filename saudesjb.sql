CREATE DATABASE saudesjb;
USE saudesjb;

CREATE TABLE Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Dias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia DATE NOT NULL
);

CREATE TABLE Horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    horario TIME NOT NULL
);

CREATE TABLE Clinicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(55),
    rua VARCHAR(55),
    bairro VARCHAR(55),
    numero VARCHAR(55),
    cep VARCHAR(55)
);

CREATE TABLE Consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    dia_id INT NOT NULL,
    horario_id INT NOT NULL,
    clinica_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES Medicos(id),
    FOREIGN KEY (dia_id) REFERENCES Dias(id),
    FOREIGN KEY (horario_id) REFERENCES Horarios(id),
    FOREIGN KEY (clinica_id) REFERENCES Clinicas(id),
    UNIQUE (dia_id, horario_id)
);

INSERT INTO Dias (dia) VALUES 
('2024-05-01'),
('2024-05-02'),
('2024-05-03'),
('2024-05-04'),
('2024-05-05'),
('2024-05-06'),
('2024-05-07'),
('2024-05-08'),
('2024-05-09'),
('2024-05-10'),
('2024-05-11'),
('2024-05-12'),
('2024-05-13'),
('2024-05-14'),
('2024-05-15'),
('2024-05-16'),
('2024-05-17'),
('2024-05-18'),
('2024-05-19'),
('2024-05-20'),
('2024-05-21'),
('2024-05-22'),
('2024-05-23'),
('2024-05-24'),
('2024-05-25'),
('2024-05-26'),
('2024-05-27'),
('2024-05-28'),
('2024-05-29'),
('2024-05-30'),
('2024-05-31');

INSERT INTO Horarios (horario) VALUES 
('07:00:00'),
('08:00:00'),
('09:00:00'),
('10:00:00'),
('11:00:00'),
('12:00:00'),
('13:00:00'),
('14:00:00'),
('15:00:00'),
('16:00:00');

INSERT INTO Pacientes (nome, data_nascimento, telefone, email) VALUES
('João Silva', '1985-03-15', '123456789', 'joao.silva@example.com'),
('Maria Souza', '1990-07-22', '987654321', 'maria.souza@example.com');

INSERT INTO Medicos (nome, especialidade, telefone, email) VALUES
('Dr. Pedro Mendes', 'Cardiologista', '555123456', 'pedro.mendes@example.com'),
('Dra. Ana Clara', 'Dermatologista', '555654321', 'ana.clara@example.com');

-- Inserir um registro na tabela Clinicas
INSERT INTO Clinicas (nome, rua, bairro, numero, cep) VALUES
('Clinica Central', 'Rua A', 'Bairro B', '123', '12345-678');

-- Agora podemos inserir na tabela Consultas
INSERT INTO Consultas (paciente_id, medico_id, dia_id, horario_id, clinica_id) VALUES
(1, 1, 1, 1, 1); -- João Silva com Dr. Pedro Mendes no primeiro dia e horário

SELECT c.id, p.nome AS paciente, m.nome AS medico, d.dia, h.horario
FROM Consultas c
JOIN Pacientes p ON c.paciente_id = p.id
JOIN Medicos m ON c.medico_id = m.id
JOIN Dias d ON c.dia_id = d.id
JOIN Horarios h ON c.horario_id = h.id
WHERE d.dia = '2024-05-20';

