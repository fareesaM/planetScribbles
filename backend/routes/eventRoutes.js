import express from "express";
import {
  createEvent,
  getEvents,
  getEventById
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/')
  .post(protect, admin, createEvent)
  .get(getEvents);

router.route('/:id')
  .get(getEventById);

export default router;