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
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

type ListContainerProps = {
  boardId: string;
  data: ListWithCards[];
};

function reorder<T>(list: T[], sourceIndex: number, destinationIndex: number) {
  const items = Array.from(list);
  const [movedItem] = items.splice(sourceIndex, 1);
  items.splice(destinationIndex, 0, movedItem);

  return items;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess() {
      toast.success("Lists reordered");
    },
    onError(error) {
      toast.success(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess() {
      toast.success("Cards reordered");
    },
    onError(error) {
      toast.success(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd: OnDragEndResponder = function (result) {
    const { destination, source, type } = result;

    // console.log(result);
    if (!destination) return;

    // user moves list or card in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // user moves list
    if (type === "list") {
      const reorderedLists = reorder(
        orderedData,
        source.index,
        destination.index,
      );

      reorderedLists.forEach((list, index) => {
        list.order = index;
      });

      setOrderedData(reorderedLists);
      executeUpdateListOrder({ items: reorderedLists, boardId });
    }

    // user moves card
    if (type === "card") {
      const newOrderedData = Array.from(orderedData);

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) return;

      // Check if cards exists on the sourceList
      //  if (!sourceList.cards) {
      //   sourceList.cards = [];
      // }

      // Check if cards exists on the destList
      // if (!destList.cards) {
      //   destList.cards = [];
      // }

      // user moves card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList?.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: reorderedCards, boardId });

        // user moves card in the others list
      } else {
        // remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // asign new listId to the moved card;
        movedCard.listId = destination.droppableId;

        // add the moved card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // update the order of cards in source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });

        // update the order of cards in destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({ items: destinationList.cards, boardId });
      }
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
