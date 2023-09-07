import React, { Suspense } from "react";
import TodosList from "./(users)/todos/TodosList";

function page() {
  return (
    <div>
      <Suspense fallback={<p className="text-red-500">Loading the Todos...</p>}>
        <h1>Loading Todos</h1>
        <div className="flex space-x-2">
          <TodosList />
        </div>
      </Suspense>

      <Suspense fallback={<p className="text-blue-500">Loading the Shopping Trolley...</p>}>
        <h1>Loading Shopping Trolley</h1>
        <div className="flex space-x-2">
          <TodosList />
        </div>
      </Suspense>
    </div>
  );
}

export default page;
