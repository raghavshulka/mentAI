import express from "express";
import {
  createBooking,
  createSession,
  deleteBooking,
  deleteSession,
  getAllBookings,
  getAllSessions,
  getBooking,
  getSession,
  updateBooking,
  updateSession,
} from "../controllers/sessionAndBookingController";

const app = express.Router();

app.post("/sessions", createSession);
app.post("/bookings", createBooking);
app.get("/sessions/:id", getSession);
app.get("/bookings/:id", getBooking);
app.put("/sessions/:id", updateSession);
app.put("/bookings/:id", updateBooking);
app.delete("/sessions/:id", deleteSession);
app.delete("/bookings/:id", deleteBooking);
app.get("/sessions", getAllSessions);
app.get("/bookings", getAllBookings);

export default app;
