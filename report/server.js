// 1. create an express server for backend
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connectDB
connectDB();

//Initialze Middleware
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admissions', require('./routes/api/admissions'));
app.use('/api/applicants', require('./routes/api/applicants'));
app.use('/api/departments', require('./routes/api/departments'));
app.use('/api/programs', require('./routes/api/programs'));
app.use('/api/survey', require('./routes/api/survey'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
