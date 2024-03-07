import express from 'express';
import listingsRouter from './api/listings.js';
import sessionRouter from './api/session.js';
import userRouter from './api/user.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Use listings APIs
app.use('/', listingsRouter);

// Use user APIs
app.use('/', userRouter);

// Use session APIs
app.use('/', sessionRouter);

// serve hero image files for listings consumption
app.use('/images', express.static('public/hero_images'));
