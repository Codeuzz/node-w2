import { z } from "zod";

export const bookRegisterValidation = z.object({
  title: z.string().trim().min(1, "Le titre est requis"),
  author: z.string().trim().min(1, "L'auteur est requis"),
  publishedYear: z.string().trim().nullable(),
  categoryId: z.string().uuid().nullable(),
  userId: z.string().uuid().nullable(),
});
