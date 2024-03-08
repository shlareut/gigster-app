import express from 'express';
import {
  createSession,
  deleteSession,
  getSession,
} from '../database/session.js';
import generateSessionToken from '../utils/sessionTokenGenerator.js';

const sessionRouter = express.Router();

// create session for a particular user
// should this be inside the otp directly? because now I can create a session without any auth!
sessionRouter.get('/api/create_session/:id', async (req, res) => {
  const { id } = req.params;
  const sessionToken = generateSessionToken();
  const data = await createSession(id, sessionToken).catch(console.error);
  if (data) {
    // set session cookie
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    // return success message
    return res.json({
      success: true,
      message: 'Session created!',
      data,
    });
  }
  // return failure message
  return res.json({
    success: false,
    message: 'Failed to create session',
    data,
  });
});

// fetch session token from user
sessionRouter.get('/api/get_session', async (req, res) => {
  const cookieSessionToken = req.cookies.sessionToken;
  if (!cookieSessionToken) {
    return res.status(403).json({
      success: false,
      message: 'No cookie found.',
    });
  } else {
    const session = await getSession(cookieSessionToken).catch(console.error);
    if (!session) {
      return res.status(403).json({
        success: false,
        message: 'Cookie found, but no session in DB.',
        session,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Session found.',
        session,
      });
    }
  }
});

// delete session token from user
sessionRouter.get('/api/delete_session', async (req, res) => {
  const cookieSessionToken = req.cookies.sessionToken;
  if (!cookieSessionToken) {
    return res.status(403).json({
      success: false,
      message: 'No cookie found.',
    });
  } else {
    const session = await getSession(cookieSessionToken).catch(console.error);
    if (!session) {
      return res.status(403).json({
        success: false,
        message: 'Cookie found, but no session in DB.',
        session,
      });
    } else {
      const deletedSession = await deleteSession(cookieSessionToken).catch(
        console.error,
      );
      res.clearCookie('sessionToken');
      if (!deletedSession) {
        return res.status(200).json({
          success: false,
          message: 'Session found, but error deleting.',
          session,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Session found and deleted.',
          session,
        });
      }
    }
  }
});

export default sessionRouter;
