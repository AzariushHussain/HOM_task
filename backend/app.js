const express = require('express');
const http = require('http');
const connectMongoDb = require('./connection');
const app = express();
const server = require('http').createServer(app);
const routes = require('./routes/index');
const cors = require('cors');


require('dotenv').config();

const PORT =8000;


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Fallback to localhost if FRONTEND_URL is not set
    credentials: true
}));

app.use(express.json());

(async () => {
    try {
        await connectMongoDb.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})();

app.use('/api', routes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});