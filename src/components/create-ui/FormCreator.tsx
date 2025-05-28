"use client";

import { DivStructType } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import FormHeader from "./FormHeader";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import QuestionOutlined from "./QuestionOutlined";

export default function FormCreator() {
  const {
    form: {
      formData: { questions },
    },
    updatedQuestionArray,
  } = useFormStore();

  const reorder = (
    list: DivStructType,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    updatedQuestionArray(reordered);
  };

  return (
    <div className="mx-auto p-1 bg-muted min-h-screen flex-1 w-full">
      <FormHeader />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="singleList">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-4 transition-all ${
                snapshot.isDraggingOver ? "bg-blue-50" : ""
              }`}
            >
              {questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-shadow ${
                        snapshot.isDragging ? "shadow-lg" : "shadow-sm"
                      }`}
                    >
                      <QuestionOutlined index={index} questionData={question} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
