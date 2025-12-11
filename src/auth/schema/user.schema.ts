import { z } from 'zod';
import fi from 'zod/v4/locales/fi.js';

/**
 * User Schemas
 */
export const createUserSchema = {
    firstName: z.string().max(16),
    lastName: z.string().max(16),
    username: z.string().max(16),
    password: z.string().min(8).max(32)
};

export const signInUserSchema = {
    username: z.string().max(16),
    password: z.string().min(8).max(32)
};

export const updateUserSchema = {
    firstName: z.string().max(16).optional(),
    lastName: z.string().max(16).optional(),
    username: z.string().max(16).optional(),
    password: z.string().min(8).max(32).optional()
};

export const deleteUserSchema = {
    password: z.string().min(8).max(32)
};

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type SignInUserSchema = z.infer<typeof signInUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;