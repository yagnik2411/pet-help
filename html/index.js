const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define mongoose schema
const { Schema } = mongoose;
const petSchema = new Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  number: String,
  petType: String,
  petName: String,
  petColor: String,
  petBreed: String,
  file_upload: String,
  check: Boolean
});

const Pet = mongoose.model('Pet', petSchema);

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for handling form submission
app.post('/submit-form', async (req, res) => {
  try {
    // Extract form data
    const { name, email } = req.body;

    // Save data to MongoDB
    await Pet.create({ name, email });
    
    // Respond to the client
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
