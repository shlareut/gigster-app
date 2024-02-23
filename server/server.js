import express from 'express';
import { getProducts } from './db.js';

const app = express();
const port = 3000;
const ip = '192.168.0.5';

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// get example

app.get('/products', async (req, res) => {
  const data = await getProducts();
  res.send(data);
});
