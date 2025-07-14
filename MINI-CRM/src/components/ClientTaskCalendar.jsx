import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useCrmStore } from "../store/crmStore";
import { useMemo, useState } from "react";


export default function ClientTaskCalendar({ clientId }) {
  const { clients } = useCrmStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const tasks = clients[clientId]?.tasks || [];

  // Group tasks by due date
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (task.due) {
        map[task.due] = map[task.due] ? [...map[task.due], task] : [task];
      }
    });
    return map;
  }, [tasks]);

  // Check if date has tasks
  const tileContent = ({ date }) => {
    const iso = date.toLocaleDateString("en-CA");
    if (tasksByDate[iso]) {
      return (
        <div className="bg-blue-400 w-2 h-2 rounded-full mx-auto mt-1"></div>
      );
    }
    return null;
  };

  const selectedIso = selectedDate.toLocaleDateString("en-CA");
  const tasksForSelected = tasksByDate[selectedIso] || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border-color">
      <h3 className="text-xl font-bold mb-4 text-text-main">Task Calendar</h3>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
        className="REACT-CALENDAR p-2 rounded-lg border-none w-full"
      />

      {/* Task Details */}
      <div className="mt-6">
        <h4 className="font-semibold text-text-main mb-2">
          Tasks on {selectedIso}
        </h4>
        {tasksForSelected.length === 0 ? (
          <p className="text-text-light text-sm">No tasks for this day.</p>
        ) : (
          <ul className="space-y-2">
            {tasksForSelected.map((task) => (
              <li key={task.id} className="text-sm text-text-main bg-gray-100 px-3 py-2 rounded-md">
                • {task.title} {task.completed && "(✓)"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
