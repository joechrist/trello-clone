import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../state/actions";
import { getEmptyImage } from "react-dnd-html5-backend";

/**
 * @ Whenever we start dragging the item, the hook will dispatch a SET_DRAG_ITEM action
    to save the item in the app state. When we stop dragging, it will dispatch this action
    again with null as the payload.
 * @ end: is called when we release the item   
 * @param item Returns dragged item object and dispatches the SET_DRAGGED_ITEM action
 * @returns Return a "drag" method that accepts the ref of a draggable element.
 */
export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();

  //In our hook we don’t need the Collected Props object,
  // so we skip it which leaves us with this a hanging "comma" in the beginning.
  // we are just skipping the value that we aren’t going to use with this syntax.
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  //
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  //
  return { drag };
};
