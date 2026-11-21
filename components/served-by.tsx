import os from "node:os";
import { Suspense } from "react";
import { connection } from "next/server";
import { isDbConfigured } from "@/lib/db";

const pillClass =
  "inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm";

// The hostname has to be read on every request, not once at build time,
// so each EC2 instance behind a load balancer reports its own name.
async function Hostname() {
  await connection();
  return <>{os.hostname()}</>;
}

// Same for the database settings: they are set on the server at run time.
async function DatabaseStatus() {
  await connection();
  return <>{isDbConfigured() ? "configured" : "not configured"}</>;
}

export default function ServedBy() {
  return (
    <div className="flex flex-wrap gap-3">
      <p className={pillClass}>
        <span className="size-2 rounded-full bg-green-600" aria-hidden />
        <span className="text-muted">Served by</span>
        <span className="font-mono">
          <Suspense fallback="...">
            <Hostname />
          </Suspense>
        </span>
      </p>
      <p className={pillClass}>
        <span className="text-muted">Database</span>
        <span className="font-mono">
          <Suspense fallback="...">
            <DatabaseStatus />
          </Suspense>
        </span>
      </p>
    </div>
  );
}
