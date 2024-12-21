import express from 'express';
import { getAllUsers, createUser, findBuddies } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId/buddies', findBuddies);

export default router;