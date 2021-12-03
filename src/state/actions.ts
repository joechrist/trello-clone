/**
 * Define "Action" type alias with two actions ADD_TASK and ADD_LIST.
 * • ADD_LIST - contains the list title.
 * • ADD_TASK - text is the task text, and listId is the reference to the list it belongs
 to.
 */
export type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
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
