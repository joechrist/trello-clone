import { Action } from "./actions";

/**
 * File that will contain our reducer function.
 * Define our data app type
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
 */
export type AppState = {
  lists: List[];
};

/**
 * Our App Reducer function
 */
export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    // ...
    default: {
      return state;
    }
  }
};
