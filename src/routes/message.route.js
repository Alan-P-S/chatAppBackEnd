import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, messages, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute, messages);

router.post('/send/:id',protectRoute, sendMessage);
export default router;