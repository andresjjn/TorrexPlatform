import express from 'express';
import router from './routes/index.js';
const app = express();

// Define port
const port = process.env.PORT || 5000;

// Allow PUG
app.set('view engine', 'pug');

// Add body parser to read data from form
app.use(express.urlencoded({ extended: true }));

// Add Router
app.use('/', router);

// Add Router
app.use(express.static('public'));

app.listen(port, () => console.log(`Server started on port ${port}`));
