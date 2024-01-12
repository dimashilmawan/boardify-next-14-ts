"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

type ListContainerProps = {
  boardId: string;
  data: ListWithCards[];
};

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd: OnDragEndResponder = function (result) {
    console.log();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" direction="horizontal" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex h-full gap-3 `}
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <li className="w-1 shrink-0 " />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
