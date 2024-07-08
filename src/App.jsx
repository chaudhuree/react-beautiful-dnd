import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const handleOnDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-4 bg-gray-600 text-sky-400">
        {/*
      header
    */}
        <h1 className="w-2/4 text-center mx-auto text-4xl font-extrabold my-5">
          Drag an Drop
        </h1>
        {/*
        drag and drop area
      */}
        <div className="flex justify-between px-4">
          <Column />
          <Column />
          <Column />
        </div>
      </div>
    </DragDropContext>
  );
}

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application", status: "todo" },
    2: { id: 2, content: "Configure Next.js and tailwind ", status: "todo" },
    3: { id: 3, content: "Create sidebar navigation menu", status: "todo" },
    4: { id: 4, content: "Create page footer", status: "todo" },
    5: { id: 5, content: "Create page navigation menu", status: "todo" },
    6: { id: 6, content: "Create page layout", status: "todo" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default App;
