import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";

// Zod schema for session creation
const createSessionSchema = z.object({
  therapistId: z.number(),
  date: z.string(),
  duration: z.number().min(1), // duration in minutes
  type: z.enum(["VIDEO", "CHAT"]),
  status: z.enum(["AVAILABLE", "BOOKED", "COMPLETED", "CANCELLED"]).optional(),
});

// Zod schema for booking creation
const createBookingSchema = z.object({
  sessionId: z.number(),
  clientId: z.number(),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
});

// Create a new session
export async function createSession(req: Request, res: Response) {
  try {
    const validatedData = createSessionSchema.parse(req.body);

    const session = await prisma.session.create({
      data: {
        therapistId: validatedData.therapistId,
        date: new Date(validatedData.date),
        duration: validatedData.duration,
        type: validatedData.type,
        status: validatedData.status || "AVAILABLE",
      },
    });

    res.status(201).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ message: "failed to create session" });
  }
}

// Create a new booking
export async function createBooking(req: Request, res: Response) {
  try {
    const validatedData = createBookingSchema.parse(req.body);

    const booking = await prisma.booking.create({
      data: {
        sessionId: validatedData.sessionId,
        clientId: validatedData.clientId,
        status: validatedData.status || "PENDING",
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ message: "failed to create booking" });
  }
}

// Get session by ID
export async function getSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const session = await prisma.session.findUnique({
      where: { id: Number(id) },
      include: { therapist: true, booking: true }, // Include related therapist and booking
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "failed to get-session" });
  }
}

// Get booking by ID
export async function getBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: { client: true, session: true }, // Include related client and session
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "failed to get-booking" });
  }
}

// Update session by ID
export async function updateSession(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { date, duration, type, status } = req.body;

    const updatedSession = await prisma.session.update({
      where: { id: Number(id) },
      data: {
        date: date ? new Date(date) : undefined,
        duration: duration || undefined,
        type: type || undefined,
        status: status || undefined,
      },
    });

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "failed to update-session" });
  }
}

// Update booking by ID
export async function updateBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "failed to update-booking" });
  }
}

// Delete session by ID
export async function deleteSession(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedSession = await prisma.session.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Session deleted successfully", deletedSession });
  } catch (error) {
    res.status(500).json({ message: "failed to delete session" });
  }
}

// Delete booking by ID
export async function deleteBooking(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedBooking = await prisma.booking.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Booking deleted successfully", deletedBooking });
  } catch (error) {
    res.status(500).json({ message: "failed to delete bookings" });
  }
}

// Get all sessions
export async function getAllSessions(req: Request, res: Response) {
  try {
    const sessions = await prisma.session.findMany({
      include: { therapist: true, booking: true }, // Optionally include related data
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "failed to get session" });
  }
}

// Get all bookings
export async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings = await prisma.booking.findMany({
      include: { client: true, session: true }, // Optionally include related data
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "failed to get bookings" });
  }
}
