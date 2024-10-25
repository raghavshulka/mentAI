import { prisma } from "../utils/db";
import { Request, Response } from "express";
import Pusher from 'pusher';
import dotenv from 'dotenv';

dotenv.config();

// Zod schema for message creation
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Create a new message
export async function createMessage(req: Request, res: Response) {
  const { bookingId, senderId, content } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        bookingId,
        senderId,
        content,
      },
    });

    // Trigger a pusher event
    pusher.trigger('chat', 'message', {
      bookingId: message.bookingId,
      content: message.content,
      senderId: message.senderId,
      createdAt: message.createdAt,
    });

    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Get all messages by booking ID
export async function getMessagesByBooking(req: Request, res: Response) {
  const { bookingId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { bookingId: parseInt(bookingId) },
      orderBy: { createdAt: 'asc' },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
