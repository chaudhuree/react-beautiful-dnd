import React from "react";
import Column from "./Column";

function App() {
  return (
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
  );
}

export default App;
