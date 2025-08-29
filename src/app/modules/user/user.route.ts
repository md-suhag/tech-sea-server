import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

export const userRoutes = router;