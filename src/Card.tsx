import { useRef } from "react";
import { CardContainer } from "./styles";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { isHidden } from "./utils/isHidden";
import { moveTask, setDraggedItem } from "./state/actions";

/**
 * @ text: Text inside a card
 * @ id: Link the components with the corresponding data we’ll need to pass the id to them
 * @ columnId : Value to know in which column should the card be located
 */
type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

/** COMPONENT - */
export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  // Get the state and dispatch from the useAppState
  const { draggedItem, dispatch } = useAppState();

  // Get the CardContainer ref
  const ref = useRef<HTMLDivElement>(null);

  // Call the useItemDrag hook to get the drag function.
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  });

  // we need useDrop() to enable our cards to be drop targets.
  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    },
  });

  //
  drag(drop(ref));

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
