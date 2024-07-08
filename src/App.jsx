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

export default App;
