import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/db';



// Define Zod schemas for validation
const therapistSchema = z.object({
  userId: z.number(),
  bio: z.string().min(10),
  specialties: z.array(z.string()).nonempty(),
  education: z.string(),
  experience: z.number().min(0),
  hourlyRate: z.number().min(0),
});

const updateTherapistSchema = z.object({
  bio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  education: z.string().optional(),
  experience: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  isAvailable: z.boolean().optional(),
});

// Create a new therapist profile
export async function create(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = therapistSchema.parse(req.body);

    const therapist = await prisma.therapist.create({
      data: validatedData,
    });

    res.status(201).json(therapist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({message:"error in creating"} );
  }
}

// Get therapist profile by ID
export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const therapist = await prisma.therapist.findUnique({
      where: { id: Number(id) },
      include: { user: true }, // Optionally include related user data
    });
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json(therapist);
  } catch  {
    res.status(500).json({message:"error in getting"} );
  }
}

// Update therapist profile by ID
export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    // Validate request body
    const validatedData = updateTherapistSchema.parse(req.body);

    const therapist = await prisma.therapist.update({
      where: { id: Number(id) },
      data: validatedData,
    });

    res.json(therapist);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({message:"error in updating"} );
  }
}

// Delete therapist profile by ID
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const therapist = await prisma.therapist.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Therapist deleted successfully', therapist });
  } catch (error) {
    res.status(500).json({message:"error in removing"} );
  }
}

// Get all therapists (optional)
export async function getAll(req: Request, res: Response) {
  try {
    const therapists = await prisma.therapist.findMany({
      include: { user: true }, // Optionally include related user data
    });
    res.json(therapists);
  } catch (error) {
    res.status(500).json({message:"error in getting all"} );
  }
}

