import express from 'express';
import { createVenue, getVenue, getVenues } from './db.js';

const app = express();
const port = 3000;
// const ip = '192.168.0.5';

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// get example

// app.get('/products', async (req, res) => {
//   const data = await getProducts();
//   res.send(data);
// });

// GET all venues
app.get('/api/venues', async (req, res) => {
  const data = await getVenues();
  return res.send(data);
});

// GET one venue
app.get('/api/venues/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getVenue(id);
  return res.send(data[0]);
});

// POST new venue
// app.post('/api/createVenue', async (req, res) => {
//   const data = await createVenue();
//   return res.send(data);
// });

// serve hero image files
app.use('/images', express.static('public/hero_images'));
