import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  tokenStore: "nextjs-cookie",
});
