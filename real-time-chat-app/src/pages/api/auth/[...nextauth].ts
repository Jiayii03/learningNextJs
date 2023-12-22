// See next-auth official documentation for more details: https://next-auth.js.org/getting-started/example

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

// all the configuration options are in src/lib/auth.ts
export default NextAuth(authOptions)