require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const digipinRoutes = require('./routes/digipinRoute.js');
const app = express();

//const PORT = process.env.PORT;

// Connect to MongoDB


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://digipin-hfir-git-main-gaurav-sharmas-projects-97aa0168.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.use(morgan('dev'));

// Swagger Documentation
const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the DigiPin API. Visit /api-docs for documentation.');
});

// DigiPin API routes
app.use('/api/digipin', digipinRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal index Error' });
});

// app.listen(PORT, () => {
//   console.log(`index is running on port http://localhost:${PORT}/api/digipin`);
// });

module.exports = app; // Export the app for testing or serverless deployment

