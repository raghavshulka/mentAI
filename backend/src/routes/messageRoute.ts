import express from 'express';
import { createMessage, getMessagesByBooking } from '../controllers/messageController'; // Adjust import path

const app = express.Router();

app.post('/messages', createMessage);
app.get('/messages/:bookingId', getMessagesByBooking);

export default app;
