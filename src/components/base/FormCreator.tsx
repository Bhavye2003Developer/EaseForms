"use client";

import { DivStructType } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import FormHeader from "./FormHeader";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { Card } from "@/components/ui/card";
import QuestionOutlined from "../create/Inputs/QuestionOutlined";

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    updatedQuestionArray(reordered);
  };

  return (
    <Card className="flex flex-col p-2 sm:p-4 rounded-2xl border border-muted shadow-sm h-full overflow-y-auto bg-zinc-950 scrollbar-hide">
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
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 sm:p-4 rounded-xl transition-shadow border ${
                        snapshot.isDragging ? "shadow-lg" : "shadow"
                      }`}
                    >
                      <QuestionOutlined index={index} questionData={question} />
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}
