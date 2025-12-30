const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (directly here)
mongoose.connect('mongodb://127.0.0.1:27017/courseDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// routes
app.use('/api/courses', require('./routes/courseRoutes'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
