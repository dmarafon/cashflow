import express = require('express');
import morgan = require('morgan');
import cors = require('cors');
import { pool } from './queries';

const corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3333'],
};

export const app = express();

app.disable('x-powered-by');

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.static('uploads'));

app.use(express.json());

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

app.get('/users', getUsers);

// app.use(notFoundError);

// app.use(generalError);
