import { useState } from "react";
import { useCrmStore } from "../store/crmStore";
import { toast } from "react-hot-toast";

export default function TasksPage() {
  const tasks = useCrmStore((state) => state.tasks || []);
  const addTask = useCrmStore((state) => state.addTask);
  const deleteTask = useCrmStore((state) => state.deleteTask);
  const toggleTask = useCrmStore((state) => state.toggleTask);

  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    addTask(newTask.trim(), dueDate || null);
    toast.success("Task added!");
    setNewTask("");
    setDueDate("");
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return sortAsc
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    });

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-text-main dark:text-white">Task Manager</h2>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-sm text-primary underline"
        >
          Sort by Due Date {sortAsc ? "▲" : "▼"}
        </button>
      </div>

      {/* Add Task */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 border border-border-color rounded-md"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-2 border border-border-color rounded-md"
        />
        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-hover"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-text-light py-6">
            No tasks found. Try adding one!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white dark:bg-gray-800 border border-border-color rounded-lg px-4 py-3 shadow-sm flex justify-between items-center"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      toggleTask(task.id);
                      toast.success(
                        task.completed
                          ? "Marked as incomplete"
                          : "Task completed!"
                      );
                    }}
                    className="h-5 w-5 accent-primary"
                  />
                  <span
                    className={`text-text-main dark:text-white ${
                      task.completed ? "line-through text-text-light" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                {task.dueDate && (
                  <span className="text-sm text-gray-400 ml-auto">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  deleteTask(task.id);
                  toast.error("Task deleted!");
                }}
                className="text-red-400 hover:text-red-600 font-semibold text-sm m-2"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
