import express from 'express';
import { createSession } from '../database/session.js';
import generateSessionToken from '../utils/sessionTokenGenerator.js';

const userRouter = express.Router();

// create session for a particular user
userRouter.get('/api/users/create_session/:id', async (req, res) => {
  const { id } = req.params;
  const sessionToken = generateSessionToken();
  const data = await createSession(id, sessionToken).catch(console.error);
  if (data) {
    return res.json({
      exists: true,
      message: 'Session created!',
      data,
    });
  }
  return res.json({
    exists: false,
    message: 'Failed to create session',
    data,
  });
});

export default userRouter;
