import { useState } from "react";
import { useCrmStore } from "../store/crmStore";
import toast from "react-hot-toast";

export default function ClientTaskList({ clientId }) {
  const { clients, addTaskToClient, deleteTaskFromClient, toggleTaskForClient } = useCrmStore();
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const tasks = clients[clientId]?.tasks || [];

  const handleAdd = () => {
    if (!taskInput.trim()) return;
    addTaskToClient(clientId, {
      title: taskInput.trim(),
      completed: false,
      due: dueDate,
    });
    toast.success("Task added");
    setTaskInput("");
    setDueDate("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border-color">
      <h3 className="text-xl font-bold mb-4 text-text-main">Tasks</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-border-color rounded-md"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border border-border-color rounded-md"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-text-light text-center py-4">No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-secondary dark:text-black p-3 rounded-md flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    toggleTaskForClient(clientId, task.id);
                    toast.success(task.completed ? "Marked incomplete" : "Task completed!");
                  }}
                  className="accent-primary h-5 w-5"
                />
                <div>
                  <p className={`font-semibold ${task.completed ? "line-through text-text-light" : ""}`}>
                    {task.title}
                  </p>
                  {task.due && (
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  deleteTaskFromClient(clientId, task.id);
                  toast.error("Task deleted");
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
