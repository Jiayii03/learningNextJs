import React from 'react'
import { Todo } from '../../../typings'
import { notFound } from "next/navigation"

export const dynamicParams = true;

type PageProps = {
    params: {
        todoId: string
    }
}

const fetchTodo = async (todoId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next: { revalidate: 60 } })
    const todo: Todo = await res.json()
    // console.log(todo) // rendering on server, so we're seeing it at the terminal
    return todo
}

async function TodoPage({ params: { todoId } }: PageProps) {
    const todo = await fetchTodo(todoId)

    if (!todo.id) return notFound();

    return (
        <div className='p-10 bg-yellow-200 border-2 m-2 shadow-lg'>
            <p className='text-cyan-950'>
                #{todo.id}: {todo.title}
            </p>
            <p className='text-cyan-950'>
                Completed: {todo.completed ? 'Yes' : 'No'}
            </p>
            <p className='border-t border-black mt-5 text-right text-cyan-950'>
                By User: {todo.userId}
            </p>
            
        </div>
    )
}

export default TodoPage

export async function generateStaticParams() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
    const todos: Todo[] = await res.json()

    const trimmedTodos = todos.splice(0, 10);

    return trimmedTodos.map((todo) => ({
        todoId: todo.id.toString(),
    }))
}