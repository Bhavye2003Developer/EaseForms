import { z } from "zod/v4";

export const formIdSchema = z.string().trim().length(24);

export const UserSchema = z.strictObject({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});
