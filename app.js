const express = require('express');
const cors = require('cors');

const triggerRoutes = require('../social-crosspost/src/routes/triggeredRoutes');

const app = express();
app.use(cors());
app.use(express.json());
console.log("backend is working");
// Routes
app.use('/api', triggerRoutes);

module.exports = app;
