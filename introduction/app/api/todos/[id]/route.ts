import { NextResponse } from 'next/server';
import { Todo } from '../../../../typings';

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

// route handler
export async function GET(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1); // slice everything starting from the index after the slash

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
    
    const todo: Todo = await res.json();

    // if there is no todo with the id, it returns {}
    if (!todo.id) return NextResponse.json( { 'message': `Todo ${id} not found` })

    return NextResponse.json(todo);

}