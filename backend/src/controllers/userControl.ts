import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/db";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

// Define validation schemas for user creation and updates
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6), // Require password for non-Clerk auth
  role: z.nativeEnum(Role).optional(), // Role from your Prisma schema
});
const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  name: z.string().min(1).optional(),
  role: z.enum(["THERAPIST", "CLIENT", "ADMIN"]).optional(),
});

// Create a new user
export async function create(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = createUserSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword, // Save password
        role: validatedData.role || Role.CLIENT,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ message: "Unable to create user" });
  }
}

// Get user profile by ID
export async function get(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }, // Ensure id is converted to an integer
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch user" });
  }
}

// Update user profile by ID
export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Validate request body
    const validatedData = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: validatedData,
    });

    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ message: "Unable to update user" });
  }
}

// Delete user profile by ID
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove user" });
  }
}

// Get all users
export async function getAll(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      include: { therapist: true, client: true, admin: true }, // Optionally include related profiles
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve users" });
  }
}
