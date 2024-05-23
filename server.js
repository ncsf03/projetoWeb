const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Senha de acesso
    database: 'saudesjb' // Nome do banco de dados
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

//envia o formulário de login
app.post('/login', (req, res) => {
    const { id, data_nascimento } = req.body;
    const query = 'SELECT * FROM Pacientes WHERE id = ? AND data_nascimento = ?';

    db.query(query, [id, data_nascimento], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        if (results.length > 0) {
            res.json({ success: true, paciente: results[0] });
        } else {
            res.json({ success: false, error: 'Login ou data de nascimento incorretos' });
        }
    });
});

// Rota para obter médicos
app.get('/medicos', (req, res) => {
    const query = 'SELECT id, nome FROM Medicos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para obter dias
app.get('/dias', (req, res) => {
    const query = 'SELECT id, dia FROM Dias';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para obter horários
app.get('/horarios', (req, res) => {
    const query = 'SELECT id, horario FROM Horarios';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para obter clínicas
app.get('/Clinicas', (req, res) => {
    const query = 'SELECT id, nome, rua, numero, bairro FROM Clinicas';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

//rota para marcar consultas
app.post('/marcar-consulta', (req, res) => {
    const { paciente_id, medico_id, dia_id, horario_id, clinica_id } = req.body;
    const query = 'INSERT INTO Consultas (paciente_id, medico_id, dia_id, horario_id, clinica_id) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [paciente_id, medico_id, dia_id, horario_id, clinica_id], (err, result) => {
        if (err) {
            console.error('Erro ao marcar consulta:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, result });
    });
});

// Rota para obter consultas
app.get('/consultas', (req, res) => {
    const query = `
        SELECT c.id, p.nome AS paciente, m.nome AS medico, d.dia, h.horario, cl.nome AS clinica
        FROM Consultas c
        JOIN Pacientes p ON c.paciente_id = p.id
        JOIN Medicos m ON c.medico_id = m.id
        JOIN Dias d ON c.dia_id = d.id
        JOIN Horarios h ON c.horario_id = h.id
        JOIN Clinicas cl ON c.clinica_id = cl.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Rota para obter uma consulta específica
app.get('/consultas/:id', (req, res) => {
    const consultaId = req.params.id;
    const query = `
        SELECT c.id, c.medico_id, c.dia_id, c.horario_id, c.clinica_id
        FROM Consultas c
        WHERE c.id = ?
    `;

    db.query(query, [consultaId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Consulta não encontrada');
        }
        res.json(result[0]);
    });
});

// Rota para atualizar consultas
app.put('/consultas/:id', (req, res) => {
    const consultaId = req.params.id;
    const { medico_id, dia_id, horario_id, clinica_id } = req.body;
    const query = `
        UPDATE Consultas
        SET medico_id = ?, dia_id = ?, horario_id = ?, clinica_id = ?
        WHERE id = ?
    `;

    db.query(query, [medico_id, dia_id, horario_id, clinica_id, consultaId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar consulta:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, result });
    });
});

app.delete('/consultas/:id', (req, res) => {
    const consultaId = req.params.id;
    const query = 'DELETE FROM Consultas WHERE id = ?';

    db.query(query, [consultaId], (err, result) => {
        if (err) {
            console.error('Erro ao excluir consulta:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, message: 'Consulta excluída com sucesso' });
    });
});

// Rota para cadastrar pacientes
app.post('/pacientes', (req, res) => {
    const { nome, data_nascimento, telefone, email } = req.body;
    const query = 'INSERT INTO Pacientes (nome, data_nascimento, telefone, email) VALUES (?, ?, ?, ?)';

    db.query(query, [nome, data_nascimento, telefone, email], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar paciente:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, result });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
