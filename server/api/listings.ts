import express from 'express';
import { getAllListings, getSingleListing } from '../database/listings.js';

const listingsRouter = express.Router();

// GET all venues
listingsRouter.get('/api/listings', async (req, res) => {
  const data = await getAllListings().catch(console.error);
  return res.send(data);
});

// GET one venue
listingsRouter.get('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getSingleListing(Number(id)).catch(console.error);
  return res.send(data[0]);
});

export default listingsRouter;
