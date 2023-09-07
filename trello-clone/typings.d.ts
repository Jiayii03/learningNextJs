interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypedColumn,
    todos: Todo[]
}

interface Todo {
    $id: string, // $ means it's a special or system-generated id
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: string,
}

interface Image {
    bucketId: string;
    fileId: string;
}