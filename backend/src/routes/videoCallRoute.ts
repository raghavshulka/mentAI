import { Router } from "express";
import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

const createToken = async (roomName: string, participantName: string): Promise<string> => {
  const apiKey = process.env.LIVEKIT_API_KEY || "";
  const apiSecret = process.env.LIVEKIT_API_SECRET || "";
  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    ttl: "10m", // Token is valid for 10 minutes
  });
  at.addGrant({ roomJoin: true, room: roomName });
  return at.toJwt();
};

// Define the endpoint to get the token
router.get('/video/token', async (req, res) => {
  try {
    const { roomName, participantName } = req.query;
    if (typeof roomName !== 'string' || typeof participantName !== 'string') {
      return res.status(400).json({ error: 'roomName and participantName are required' });
    }
    const token = await createToken(roomName, participantName);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

export default router;
