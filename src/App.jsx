import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Function to reorder tasks within the same column
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const initialData = {
  tasks: [
    { id: 1, content: "Configure Next.js application", priority: "high" },
    { id: 2, content: "Configure Next.js and tailwind", priority: "normal" },
    { id: 3, content: "Create sidebar navigation menu", priority: "low" },
    { id: 4, content: "Create page footer", priority: "normal" },
    { id: 5, content: "Create page navigation menu", priority: "high" },
    { id: 6, content: "Create page layout", priority: "low" },
  ],
};

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);

  // Effect to load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Effect to save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    const reorderedTasks = reorder(tasks, source.index, destination.index);
    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-4 bg-gray-600 text-sky-400">
        <h1 className="w-2/4 text-center mx-auto text-4xl font-extrabold my-5">
          Single Column Drag and Drop
        </h1>
        <div className="flex mx-auto flex-col w-[350px] min-h-dvh bg-gray-700 font-bold rounded-md border  border-gray-900">
          {/* Heading */}
          <div className="flex rounded-t-md items-center text-xl justify-center h-16 px-1 py-1 mb-2 bg-gray-800">
            <h1>TODOS</h1>
          </div>
          <Droppable droppableId="column">
            {(provided) => (
              <div
                className="flex flex-col flex-1 w-[350px] bg-gray-700 font-bold rounded-md "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`mb-1 bg-gray-900  px-4 py-2 ${
                          snapshot.isDragging
                            ? "bg-gray-800 border border-sky-200 shadow-lg"
                            : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="text-base font-medium">
                          {task.content} -{" "}
                          <span className="text-sm text-yellow-500">
                            {task.priority}
                          </span>
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
