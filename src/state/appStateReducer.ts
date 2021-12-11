import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

/**
 * @ File that will contain our reducer function.
 * @ Define our data app type
 */

export type Task = {
  id: string;
  text: string;
};

/**
 * Define our data app type
 */
export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

/**
 * Define our data app state type
 * @params lists:
 * @params draggedItem: Drag Column or Card
 */
export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

/**
 * Our App Reducer function
 * Here we renamed the state into draft=brouillon, so we know that we can mutate it
 * Also we’ve changed the ADD_LIST case so that it just pushes the new list object to the lists array.
 * We don’t need to return the new state value anymore, ImmerJS will handle it           automatically.
 * We also updated the return type of our reducer.
 * @ NB: When you when to add new feature or 'Action', then add a new case "...":{}
 */
export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    }
    case "MOVE_TASK": {
      // Destructuring payload
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;

      // Then we need to get the source and target list indices
      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId);

      // Then we need to find the indices of the dragged and hovered items:
      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );
      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId)
        : 0;

      // After we have them we need to store the moved item in a variable:
      const item = draft.lists[sourceListIndex].tasks[dragIndex];

      // Now remove the task from the source list
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);

      // Add the task to the target list
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
