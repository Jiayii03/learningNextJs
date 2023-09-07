import React from 'react'
import { Todo } from '../../../typings'
import Link from 'next/link';

const fetchTodos = async () => {
    // timeout for random number of seconds between 1 and 5
    const timeout = Math.floor(Math.random() * 5) + 1
    await new Promise((resolve) => setTimeout(resolve, timeout * 1000))


    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const todos: Todo[] = await res.json() // response from api is an array of todos object
    // console.log(todos) // rendering on server, so we're seeing it at the terminal
    return todos
}

async function TodosList() {
    const todos = await fetchTodos()

  return (
    <>
        {/* using () with => implicitly return the result of the expression; using {} with => needs to return explicitly*/}
        {todos.map((todo) => (
            <p key={todo.id}>
                <Link href={`/todos/${todo.id}`}>
                    Todo: {todo.id}
                </Link>
            </p>
        ))

        }
    </>
  )
}

export default TodosList