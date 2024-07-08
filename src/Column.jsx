import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Column({ column, tasks }) {
  return (
    <div className="flex flex-col w-[350px] min-h-[620px] bg-gray-700 font-bold rounded-md border  border-gray-900">
      {/* Heading */}
      <div className="flex rounded-t-md items-center text-xl justify-center h-16 px-1 py-1 mb-2 bg-gray-800">
        <h1>{column.title}</h1>
      </div>
      {/* Tasks container */}
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="flex flex-1 px-1 flex-col"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {/* Task content container */}
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    className={`mb-1 bg-gray-900 rounded-md  px-4 py-2 ${draggableSnapshot.isDragging ? "bg-gray-800 border border-sky-200 shadow-lg" : ""}`}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    {/* Task content */}
                    <p className="text-base font-medium">
                      {task.content} - <span className="text-sm text-yellow-500">{task.status}</span>
                    </p>
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
