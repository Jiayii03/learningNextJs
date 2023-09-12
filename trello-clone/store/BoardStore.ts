import { database, storage, ID } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

// this part is implementing the zustand library
interface BoardState {

  // this is for updating the board and db
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void;

  // this is for the search input
  searchString: string;
  setSearchString: (searchInput: string) => void;

  // this is for the new task input 
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  // this is for the new task type radio group
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  // this is for the new image upload
  image: File | null;
  setImage: (image: File | null) => void;

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDb: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  searchString: "",
  setSearchString: (searchInput) => set({ searchString: searchInput }),
  
  newTaskInput: "",
  setNewTaskInput: (input) => set({ newTaskInput: input }),

  newTaskType: 'todo',
  setNewTaskType: (columnId) => set( { newTaskType: columnId }),

  image: null,
  setImage: (image) => set ( {image : image}),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) =>{
    const newColumns = new Map(get().board.columns);

    // delete todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set( {board: {columns: newColumns }});

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    ); 
  },
  

  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      console.log("Uploaded image", fileUploaded)
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id
        };
      }
    }

    const { $id } = await database.createDocument( 
      process.env.NEXT_PUBLIC_DATABASE_ID!, // ! is called the "non-null assertion operator"
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({newTaskInput: ""});
    set((state) => {  
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId)

      if(!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  

  }
}));
