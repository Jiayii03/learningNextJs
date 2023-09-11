import { NextResponse } from 'next/server';
import { Todo } from '../../../typings';

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

// route handler
export async function GET() {
    const res = await fetch(DATA_SOURCE_URL);

    const todos: Todo[] = await res.json();

    return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();

    if (!id) return NextResponse.json({ 'message': 'Todo id is required' });

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return NextResponse.json( { 'message': `Todo ${id} is deleted` })
}

export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json();

    if (!userId || !title) return NextResponse.json({ 'message': 'Missing required data' });

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    })

    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo)
}

export async function PUT(request: Request) {
    const { id, userId, title, completed }: Todo = await request.json(); // put request needs to receive everything about todo

    if (!id || !userId || !title || typeof(completed) !== 'boolean') return NextResponse.json({ 'message': 'Missing required data' });

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId, title, completed
        })
    })

    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo)
}