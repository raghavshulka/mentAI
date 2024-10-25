import { chat } from '../controllers/chatbotController';
import express from 'express';

const app = express.Router();

app.post('/chat', chat);

export default app;