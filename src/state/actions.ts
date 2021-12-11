import { DragItem } from "../DragItem";

/**
 * Define "Action" type alias with two actions ADD_TASK and ADD_LIST.
 * @ ADD_LIST - contains the list title.
 * @ ADD_TASK - text is the task text, listId is the reference to the list it belongs to.
 * @ MOVE_LIST - drag and drop items in list
 * @ SET_DRAGGED_ITEM - Hold the DragItem. We need to be able to set it to null if
     we are not dragging anything. We are not using the undefined here because it would
     mean that the field could be omitted. In our case it’s not true, it can just be empty
     sometimes.
 */
export type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_LIST";
      payload: {
        draggedId: string;
        hoverId: string;
      };
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload: DragItem | null;
    };

/**
 * ACTION CREATOR for adding tasks
 */
export const addTask = (text: string, listId: string): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId,
  },
});

/**
 * ACTION CREATOR for adding Lists
 */
export const addList = (text: string): Action => ({
  type: "ADD_LIST",
  payload: text,
});

/**
 * ACTION CREATOR for moving list
 */
export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: "MOVE_LIST",
  payload: {
    draggedId,
    hoverId,
  },
});

/**
 * Action creator to set the drag item
 * @ NB: Implement an action creator when addeda new action
 */
export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: "SET_DRAGGED_ITEM",
  payload: draggedItem,
});
