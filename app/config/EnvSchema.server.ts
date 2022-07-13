import { Env } from "~/helpers/bloom-helper.server";

export const EnvSchema = Env.define({
  SESSION_SECRET: Env.string,
});
