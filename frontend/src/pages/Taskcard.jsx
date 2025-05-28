import React from "react";

const TaskCard = ({ task, onComplete, onEdit, onDelete }) => {
  const { _id, title, completed } = task;

  return (
    <div
      className={`flex items-center justify-between p-4 mb-2 rounded border ${
        completed ? "bg-green-100 border-green-400" : "bg-white border-gray-300"
      }`}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onComplete(_id, e.target.checked)}
          className="w-5 h-5 cursor-pointer"
          aria-label={`Mark task "${title}" as complete`}
        />
        <span
          className={`select-none ${
            completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {title}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
          aria-label={`Edit task "${title}"`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
          aria-label={`Delete task "${title}"`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
