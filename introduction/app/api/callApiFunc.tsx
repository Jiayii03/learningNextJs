import { Todo } from "../../typings";

// example function to call the endpoint
export async function callApiFunc(todo: Partial<Todo>) {
    const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    })

    const responseJson = await res.json();
    console.log(responseJson);
}