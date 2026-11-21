import os from "node:os";
import { connection } from "next/server";

// Health check for the load balancer. It does not touch the database, so
// a database outage does not make the load balancer replace the instance.
export async function GET() {
  await connection();
  return Response.json({ status: "ok", host: os.hostname() });
}
