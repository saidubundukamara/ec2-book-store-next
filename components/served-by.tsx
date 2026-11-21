import os from "node:os";
import { Suspense } from "react";
import { connection } from "next/server";

// The hostname has to be read on every request, not once at build time,
// so each EC2 instance behind a load balancer reports its own name.
async function Hostname() {
  await connection();
  return <>{os.hostname()}</>;
}

export default function ServedBy() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm">
      <span className="size-2 rounded-full bg-green-600" aria-hidden />
      <span className="text-muted">Served by</span>
      <span className="font-mono">
        <Suspense fallback="...">
          <Hostname />
        </Suspense>
      </span>
    </p>
  );
}
