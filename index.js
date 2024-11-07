require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const biodataRoutes = require('./src/routes/biodataRoutes');
const pregnancyRoutes = require('./src/routes/pregnancyRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const combineSwaggerDocs = require('./src/swagger/swaggerConfig');


const app = express();

app.use(cors(
    
   
));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/biodata', biodataRoutes);
app.use('/api/pregnancy', pregnancyRoutes);
app.use('/api/complaints', complaintRoutes);
const swaggerDocument = combineSwaggerDocs();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
