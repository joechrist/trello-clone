/**
 * Define "Action" type alias with two actions ADD_TASK and ADD_LIST.
 * • ADD_LIST - contains the list title.
 * • ADD_TASK - text is the task text, listId is the reference to the list it belongs to.
 * * MOVE_LIST - drag and drop items in list
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
