"use client";

import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";

function Board() {

  const getBoard = useBoardStore((state) => state.getBoard)

  useEffect(() => {
    getBoard();
  }, [getBoard]); // The dependency array [getBoard] ensures that the effect runs whenever the getBoard function reference changes.

  return (
    <h1>HELLO</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/* rendering all the columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;
