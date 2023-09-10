const formatTodosForAI = (board: Board) => {
    
    // use Array.from() to convert the map into an array
    const todos = Array.from(board.columns.entries()); // [['inprogress', {…}], ['todo', {…}], ['done', {…}]]

    // use reduce() to convert the array into an object
    const flatArray = todos.reduce((map, [key, value]) => {
        // console.log(value) // {id: 'todo', todos: Array(1)}
        map[key] = value.todos;
        return map
    }, {} as {[key in TypedColumn]: Todo[]}) // initializing an empty object with keys of type TypedColumn and values of type Todo[]

    // use Object.entries() to convert the object into an array of key-value pairs
    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map, [key, value]) => {
            map[key as TypedColumn] = value.length;
            return map;
        },
        {} as { [key in TypedColumn]: number }
    )

    return flatArrayCounted;
}

export default formatTodosForAI

/*
After using Array.from().reduce()
{
    "todo": [{ // an array of objects
        0: {
            $id: "1",
            $createdAt: "2021-10-04T15:00:00.000Z",
            title: "Todo 1",
            status: "todo",
        },
        1: {
            $id: "2",
            $createdAt: "2021-10-04T15:00:00.000Z",
            title: "Todo 2",
            status: "todo",
        },
    }]
}

After using Object.entries()
[Array(2), Array(2), Array(2)]
*/
