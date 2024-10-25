import { Request, Response } from 'express';
import { z } from 'zod';
import {prisma} from '../utils/db'

// Define Zod schema for client creation
const createClientSchema = z.object({
  userId: z.number(),
  dateOfBirth: z.string().optional(), // Optional, should be in date format
  medicalHistory: z.string().optional(), // Optional
});

// Create a new client
export async function createClient(req: Request, res: Response) {
  try {
    // Validate request body using Zod
    const validatedData = createClientSchema.parse(req.body);

    const client = await prisma.client.create({
      data: {
        userId: validatedData.userId,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        medicalHistory: validatedData.medicalHistory || null,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ message:"failed to create-client" });
  }
}

// Get client by ID
export async function getClient(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id: Number(id) },
      include: { user: true, bookings: true, groups: true }, // Optionally include related data
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message:"failed to getclient" });
  }
}

// Update client profile by ID
export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { dateOfBirth, medicalHistory } = req.body;

    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data: {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        medicalHistory,
      },
    });

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message:"failed to update-client" });
  }
}

// Delete client by ID
export async function deleteClient(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedClient = await prisma.client.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Client deleted successfully', deletedClient });
  } catch (error) {
    res.status(500).json({ message:"failed to delete-client" });
  }
}

// Get all clients
export async function getAllClients(req: Request, res: Response) {
  try {
    const clients = await prisma.client.findMany({
      include: { user: true, bookings: true, groups: true }, // Optionally include related data
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message:"failed to getall-client" });
  }
}

