import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useCrmStore } from "../store/crmStore";

export default function LeadsPage() {
  const { clients, pipeline, moveLead } = useCrmStore();
  const columnOrder = Object.keys(pipeline);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    moveLead(source, destination, draggableId);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-text-main dark:text-white">Leads Pipeline</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          {columnOrder.map((columnId) => {
            const column = pipeline[columnId];
            const items = column.itemIds.map(id => clients[id]);

            return (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    className="bg-secondary rounded-lg w-80 flex flex-col"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="p-4 border-b border-border-color">
                      <h3 className="text-lg font-bold text-text-main">{column.title}</h3>
                    </div>
                    <div
                      className={`p-4 flex-grow min-h-[600px] transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                    >
                      {items.map((item, index) => (
                        <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                          {(provided) => (
                            <div
                              className="bg-white rounded-md shadow-sm p-4 mb-4 border border-border-color"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <p className="text-text-main font-bold">{item.name}</p>
                              <p className="text-sm text-text-light mt-1">{item.email}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}