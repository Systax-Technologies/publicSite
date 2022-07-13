// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { EnvSchema } from "~/config/EnvSchema.server";

const SESSION_SECRET = EnvSchema.get("SESSION_SECRET");
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      // all of these are optional
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [SESSION_SECRET],
      //   secure: true,
    },
  });

export { getSession, commitSession, destroySession };
