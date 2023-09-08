import { database } from '@/appwrite'

export const getTodosGroupedByColumn = async () => {
    const data = await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! // ! means we are sure that this variable is not null
    );

    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)){ // if a map entry with key `todo.status` does not exist
            acc.set(todo.status, { // it sets a new key-value pair in the `acc` map where the key is `todo.status` and the value is an object with the following properties
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) }) // ... is the spread operator used to merge the { image: ... } into a containing object
            // if todo.image exists and is a vlid JSON string, then it will be parsed and merged into the containing object
        });

        return acc;

    }, new Map<TypedColumn, Column>) // initializes an empty `Map` where keys are of type `TypedColumn` and values are of type `Column
    // E.g. {'inprogress' => {…}, 'todo' => {…}}

    // if columns doesn't have inprogress, todo and done, add them with empty todos
    // if so, we'll always have a map of three
    const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    // sort columns by columnTypes
    // .sort() takes a sortFunction as an argument
    // [['inprogress', {…}], ['todo', {…}], ['done', {…}]]
    // a and b are two elements from the array that need to be compared
    // columnTypes.indexOf(a[0]) => columnTypes.indexOf('inprogress') => 1
    // columnTypes.indexOf(b[0]) => columnTypes.indexOf('todo') => 0
    // 1 - 0 = 1
    // so a[0] will be placed after b[0]
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => 
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        )
    )

    const board: Board = {
        columns: sortedColumns
    }

    return board;

    // console.log(Array.from(columns.entries()))
    // for (const entry of Array.from(columns.entries())) {
    //     console.log(entry)
    // } // [['inprogress', {…}], ['todo', {…}], ['done', {…}]]
}
