import React from "react";
import Link from "next/link";

function notFound() {
  return (
    <div className="flex flex-col justify-center items-center text-slate-900 h-screen gap-y-5">
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <h2 className="text-3xl font-bold">404 | Page Not Found</h2>
        <p>
          We could not find the page you were looking for. Make sure to login
          first!
        </p>
      </div>
      <div className="flex gap-x-5">
        <p>
          Go back to{" "}
          <Link href="/" className="underline text-blue-600">
            main page
          </Link>
        </p>
        <p>
          Go back to{" "}
          <Link href="/login" className="underline text-blue-600">
            login page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default notFound;
