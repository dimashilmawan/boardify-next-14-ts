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

function reorder<T>(list: T[], sourceIndex: number, destinationIndex: number) {
  const items = Array.from(list);
  const [removedItem] = items.splice(sourceIndex, 1);
  items.splice(destinationIndex, 0, removedItem);

  return items;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd: OnDragEndResponder = function (result) {
    const { destination, source, type } = result;

    // console.log(result);
    if (!destination) return;

    // if drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index + 1 }),
      );

      setOrderedData(items);
    }

    if (type === "card") {
      const newOrderedData = Array.from(orderedData);

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      // if (!sourceList || !destinationList) return;

      // Check if cards exists on the sourceList
      //  if (!sourceList.cards) {
      //   sourceList.cards = [];
      // }

      // Check if cards exists on the destList
      // if (!destList.cards) {
      //   destList.cards = [];
      // }
    }
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
