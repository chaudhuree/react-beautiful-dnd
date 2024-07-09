import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Function to reorder tasks within the same column
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// Function to sort tasks
const sortTasks = (tasks, sortBy) => {
  const priorityOrder = { high: 1, normal: 2, low: 3 };

  if (sortBy === "high-to-low") {
    return [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sortBy === "low-to-high") {
    return [...tasks].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  } else {
    return tasks.filter((task) => task.status === sortBy);
  }
};

const initialData = {
  tasks: [
    {
      id: 1,
      content: "Configure Next.js application",
      priority: "high",
      status: "todo",
    },
    {
      id: 2,
      content: "Configure Next.js and tailwind",
      priority: "normal",
      status: "todo",
    },
    {
      id: 3,
      content: "Create sidebar navigation menu",
      priority: "low",
      status: "inprogress",
    },
    {
      id: 4,
      content: "Create page footer",
      priority: "normal",
      status: "todo",
    },
    {
      id: 5,
      content: "Create page navigation menu",
      priority: "high",
      status: "todo",
    },
    {
      id: 6,
      content: "Create page layout",
      priority: "low",
      status: "finished",
    },
  ],
};

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [sortBy, setSortBy] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks =
    sortBy === "none" ? filteredTasks : sortTasks(filteredTasks, sortBy);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="p-4 bg-gray-600 text-sky-400">
        <div className="w-2/4 text-center mx-auto text-4xl font-extrabold my-5">
          <h1>Single Column Drag and Drop</h1>
          <div className="flex justify-center gap-4 text-2xl flex-wrap mt-4 w-[350px] items-center mx-auto">
            <select
              className="p-1 bg-gray-700 text-white mr-4"
              onChange={handleSortChange}
              value={sortBy}
            >
              <option value="none">All</option>
              <option value="high-to-low">High to Low Priority</option>
              <option value="low-to-high">Low to High Priority</option>
              <option value="todo">To-do</option>
              <option value="inprogress">In-progress</option>
              <option value="finished">Finished</option>
            </select>
            <input
              type="text"
              placeholder="Search tasks..."
              className="p-1 bg-gray-700 text-white w-[350px]"
              onChange={handleSearchChange}
              value={searchQuery}
            />
          </div>
        </div>
        <div className="flex mx-auto flex-col w-[350px] min-h-dvh bg-gray-700 font-bold rounded-md border  border-gray-900">
          {/* Heading */}
          <div className="flex rounded-t-md items-center text-xl justify-center h-16 px-1 py-1  bg-gray-800">
            <h1>TODOS</h1>
          </div>
          {/*Tasks container*/}
          <Droppable droppableId="column">
            {(provided) => (
              <div
                className="flex flex-col w-[350px] min-h-[620px] bg-gray-700 font-bold  mx-auto "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sortedTasks.map((task, index) => (
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
                          </span>{" "}
                          -{" "}
                          <span className="text-sm text-green-500">
                            {task.status}
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
