import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dummyClients } from "../data/dummyClients";

// Initialize default state
const getInitialData = () => {
  const initialClients = dummyClients.reduce((acc, client) => {
    acc[client.id] = { ...client, notes: [], tasks: [] };
    return acc;
  }, {});

  const initialPipeline = {
    "column-1": { id: "column-1", title: "New Leads", itemIds: [1, 2, 3, 4, 5] },
    "column-2": { id: "column-2", title: "Contacted", itemIds: [6, 7, 8, 9, 10] },
    "column-3": { id: "column-3", title: "Proposal", itemIds: [11, 12, 13, 14, 15] },
    "column-4": { id: "column-4", title: "Won", itemIds: [] },
  };

  const initialTasks = [
    {
      id: 1,
      title: "Follow up with client Zara",
      completed: false,
      dueDate: "2025-07-16"
    },
    {
      id: 2,
      title: "Prepare proposal for TechX Ltd",
      completed: true,
      dueDate: "2025-07-14"
    },
    {
      id: 3,
      title: "Schedule call with Ali from HR team",
      completed: false,
      dueDate: "2025-07-17"
    },
    {
      id: 4,
      title: "Send invoice to GreenTech",
      completed: false,
      dueDate: "2025-07-18"
    },
    {
      id: 5,
      title: "Review client feedback forms",
      completed: true,
      dueDate: "2025-07-13"
    },
    {
      id: 6,
      title: "Upload signed NDA to client portal",
      completed: false,
      dueDate: "2025-07-20"
    }
  ];

  return {
    clients: initialClients,
    pipeline: initialPipeline,
    tasks: initialTasks,
  };
};


export const useCrmStore = create(
  persist(
    (set) => ({
      ...getInitialData(),

      // --- CLIENTS ---
      addClient: (client) =>
        set((state) => {
          const newId = Date.now();
          const newClient = { ...client, id: newId, notes: [], tasks: [] };

          return {
            clients: {
              ...state.clients,
              [newId]: newClient,
            },
            pipeline: {
              ...state.pipeline,
              "column-1": {
                ...state.pipeline["column-1"],
                itemIds: [newId, ...state.pipeline["column-1"].itemIds],
              },
            },
          };
        }),

deleteClient: (clientId) =>
  set((state) => {
    const updatedClients = { ...state.clients };
    delete updatedClients[clientId];

    // Remove clientId from all columns in pipeline
    const updatedPipeline = { ...state.pipeline };
    for (const colId in updatedPipeline) {
      updatedPipeline[colId] = {
        ...updatedPipeline[colId],
        itemIds: updatedPipeline[colId].itemIds.filter((id) => id !== clientId),
      };
    }

    return {
      clients: updatedClients,
      pipeline: updatedPipeline,
    };
  }),


      // --- NOTES ---
      addNoteToClient: (clientId, note) =>
        set((state) => {
          const client = state.clients[clientId];
          if (!client) return {};
          return {
            clients: {
              ...state.clients,
              [clientId]: {
                ...client,
                notes: [...client.notes, note],
              },
            },
          };
        }),

      deleteNoteFromClient: (clientId, noteIndex) =>
        set((state) => {
          const client = state.clients[clientId];
          if (!client) return {};
          return {
            clients: {
              ...state.clients,
              [clientId]: {
                ...client,
                notes: client.notes.filter((_, i) => i !== noteIndex),
              },
            },
          };
        }),

      // --- TASKS (Global) ---
        addTask: (taskText, dueDate = null) =>
          set((state) => ({
            tasks: [
              ...state.tasks,
              {
                id: Date.now(),
                title: taskText,
                completed: false,
                dueDate,
              },
            ],
          })),


      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        })),

      // --- TASKS (Per Client) ---
      addTaskToClient: (clientId, task) =>
        set((state) => {
          const client = state.clients[clientId];
          if (!client) return {};
          return {
            clients: {
              ...state.clients,
              [clientId]: {
                ...client,
                tasks: [...(client.tasks || []), { id: Date.now(), ...task }],
              },
            },
          };
        }),

      deleteTaskFromClient: (clientId, taskId) =>
        set((state) => {
          const client = state.clients[clientId];
          if (!client) return {};
          return {
            clients: {
              ...state.clients,
              [clientId]: {
                ...client,
                tasks: client.tasks.filter((t) => t.id !== taskId),
              },
            },
          };
        }),

      toggleTaskForClient: (clientId, taskId) =>
        set((state) => {
          const client = state.clients[clientId];
          if (!client) return {};
          return {
            clients: {
              ...state.clients,
              [clientId]: {
                ...client,
                tasks: client.tasks.map((t) =>
                  t.id === taskId ? { ...t, completed: !t.completed } : t
                ),
              },
            },
          };
        }),

      // --- DRAG & DROP: Move Leads ---
      moveLead: (source, destination, draggableId) =>
        set((state) => {
          const sourceCol = state.pipeline[source.droppableId];
          const destCol = state.pipeline[destination.droppableId];
          const sourceItems = [...sourceCol.itemIds];
          const destItems = [...destCol.itemIds];

          const index = sourceItems.indexOf(Number(draggableId));
          if (index === -1) return {};

          const [movedId] = sourceItems.splice(index, 1);

          if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, movedId);
            return {
              pipeline: {
                ...state.pipeline,
                [source.droppableId]: {
                  ...sourceCol,
                  itemIds: sourceItems,
                },
              },
            };
          } else {
            destItems.splice(destination.index, 0, movedId);
            return {
              pipeline: {
                ...state.pipeline,
                [source.droppableId]: {
                  ...sourceCol,
                  itemIds: sourceItems,
                },
                [destination.droppableId]: {
                  ...destCol,
                  itemIds: destItems,
                },
              },
            };
          }
        }),
    }),
    {
      name: "crm-storage",
    }
  )
);
