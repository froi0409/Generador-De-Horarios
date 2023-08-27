const express = require('express');
const cors = require('cors');
const db = require('./configs/database.config');

db.connectDB();

const app = express();

const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', ( req, res ) => { 
    res.json({ message: 'Welcome to my app '});
});


module.exports = {
    app
};
