"use client";

import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDb
  ]);

  // console.log(board)
  // columns: Map(3) {'todo' => {…}, 'inprogress' => {…}, 'done' => {…}}

  useEffect(() => {
    getBoard();
  }, [getBoard]); // The dependency array [getBoard] ensures that the effect runs whenever the getBoard function reference changes.

  // handle operation when drag ends
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // console.log(result)
    // https://prnt.sc/JigrStt0nf_5

    // If the user dragged card outside of the board, do nothing
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries()); // [['todo' => {…}], ['inprogress' => {…}], ['done' => {…}]]

      const [removed] = entries.splice(source.index, 1); // removes one element from the entries array at the position specified by source.index
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    // Handle card drag
    else if(type === 'card') {
      const columns = Array.from(board.columns); // converts the board.columns map into an array of arrays
      const startColIndex = columns[Number(source.droppableId)]; // find the inner array with the index of source.droppableId, e.g. ['inprogress', {…}]
      const finishColIndex = columns[Number(destination.droppableId)]; // find the inner array with the index of destination.droppableId

      // Recap: interface Column {
      // id: TypedColumn,
      // todos: Todo[]
      const startCol: Column = {
        id: startColIndex[0], // 'todo' : TypedColumn
        todos: startColIndex[1].todos, // {…} : Column
      };

      const finishCol: Column = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos,
      }

      if (!startCol || !finishCol) return;

      // if drag to the same exact position, do nothing
      if (source.index === destination.index && startColIndex === finishColIndex) return;

      const newTodos = startCol.todos;
      const [toDoMoved] = newTodos.splice(source.index, 1); // get the moved card into a new array, which is scraped from the original array

      // Same column task drag
      if (startCol.id === finishCol.id){
        newTodos.splice(destination.index, 0, toDoMoved);

        // create a new column 
        const newCol = {
          id: startCol.id,
          todos: newTodos
        }

        // create a copy of original board columns
        const newColumns = new Map(board.columns);

        newColumns.set(startCol.id, newCol);
        setBoardState({
          ...board, columns: newColumns
        })
      } 

      // Draggging to another column
      else {
        // make a copy of the finish col
        const finishTodos = finishCol.todos;
        finishTodos.splice(destination.index, 0, toDoMoved);

        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        }

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos
        })

        
        // Update in DB: it's in this block because we're only updating the db when the card is dragged to another column
        updateTodoInDB(toDoMoved, finishCol.id)
        
        setBoardState({ ...board, columns: newColumns })
      }

    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mt-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              // There will be three columns, one for each status, and each column will have a list of their own todos
              <Column
                key={id}
                id={id}
                todos={column.todos}
                index={index} // this index is the index for status, i.e. todo => 0, inprogress => 1, done => 2
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
