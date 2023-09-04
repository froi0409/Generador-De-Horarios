const express = require('express');
const cors = require('cors');
const db = require('./configs/database.config');
// Import routes
const FilesRoutes = require('./routes/files.routes');
const ProceedingsRoutes = require('./routes/proceedings.routes');


db.connectDB();

const app = express();

const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', ( req, res ) => { 
    res.json({ message: 'Welcome to my app '});
});

app.use('/api', FilesRoutes);
app.use('/api', ProceedingsRoutes);

module.exports = {
    app
};
