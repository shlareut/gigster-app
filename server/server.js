import express from 'express';
import {
  getAllListings,
  getSingleListing,
  getSingleUserByUsername,
} from './db.js';

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
app.get('/api/listings', async (req, res) => {
  const data = await getAllListings();
  return res.send(data);
});

// GET one venue
app.get('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getSingleListing(id);
  return res.send(data[0]);
});

// POST new venue
// app.post('/api/createVenue', async (req, res) => {
//   const data = await createVenue();
//   return res.send(data);
// });

// serve hero image files
app.use('/images', express.static('public/hero_images'));

// GET one user
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const data = await getSingleUserByUsername(username);
  if (data[0]) {
    return res.json({
      exists: true,
      message: 'User already exists. Redirect to login.',
    });
  }
  return res.json({
    exists: false,
    message: 'User does not exist. Redirect to sign-up.',
  });
});
