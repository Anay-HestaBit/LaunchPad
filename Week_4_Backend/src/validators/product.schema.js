import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string().min(1).max(100),
    price: z.number().nonnegative(),
    description: z.string().max(500).optional(),
    tags: z.array(z.string()).optional(),
  })
  .strict();
