import React, { useState, useEffect } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

// Function to reorder tasks within the same column
const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskLists = Array.from(sourceCol.taskLists);
  const [removed] = newTaskLists.splice(startIndex, 1);
  newTaskLists.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskLists: newTaskLists,
  };

  return newColumn;
};

// Function to update the status of a task based on the destination column
const updateTaskStatus = (task, newStatus) => {
  return { ...task, status: newStatus };
};

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "TODO",
      taskLists: [
        { id: 1, content: "Configure Next.js application", status: "todo" },
        { id: 2, content: "Configure Next.js and tailwind", status: "todo" },
        { id: 4, content: "Create page footer", status: "todo" },
        { id: 5, content: "Create page navigation menu", status: "todo" },
      ],
    },
    "column-2": {
      id: "column-2",
      title: "INPROGRESS",
      taskLists: [
        { id: 3, content: "Create sidebar navigation menu", status: "inprogress" },
      ],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskLists: [
        { id: 6, content: "Create page layout", status: "completed" },
      ],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

function App() {
  const [state, setState] = useState(initialData);

  // Effect to load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("taskState");
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  // Effect to save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("taskState", JSON.stringify(state));
  }, [state]);

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    // If there is no destination, return
    if (!destination) return;
    // If the task is dropped in the same position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Get the source and destination columns
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];
    // If the task is dropped in the same column
    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    // If the task is dropped in a different
    const startTaskLists = Array.from(sourceCol.taskLists);
    const [removed] = startTaskLists.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskLists: startTaskLists,
    };

    const endTaskLists = Array.from(destinationCol.taskLists);
    // Update related functions will go here
    const updatedTask = updateTaskStatus(
      removed,
      destinationCol.title.toLowerCase()
    );
    endTaskLists.splice(destination.index, 0, updatedTask);
    const newEndCol = {
      ...destinationCol,
      taskLists: endTaskLists,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-4 bg-gray-600 text-sky-400">
        <h1 className="w-2/4 text-center mx-auto text-4xl font-extrabold my-5">
          Drag and Drop
        </h1>
        <div className="flex justify-between px-4">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskLists;

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
