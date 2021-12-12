import { createContext, useContext, useEffect, Dispatch } from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

/**
 *  Define the application data and Data Structure for our app
 * Our Data object ( appData ) have the "AppState" type.
 */
// const appData: AppState = {
//   lists: [
//     {
//       id: "0",
//       text: "To Do",
//       tasks: [{ id: "c0", text: "Generate app scaffold" }],
//     },
//     {
//       id: "1",
//       text: "In Progress",
//       tasks: [{ id: "c2", text: "Learn Typescript" }],
//     },
//     {
//       id: "2",
//       text: "Done",
//       tasks: [{ id: "c3", text: "Begin to use static typing" }],
//     },
//   ],
//   draggedItem: null,
// };

/**
 * Our context type
 * "getTasksByListId(id: string): Task[]" fct that take an id: string and return an tasks
    array
 * dispatch: dispatch methos through the context
 * Get "draggedItem" data
 */
type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

/**
 * React wants us to provide the default value for our context. This value will only
be used if we don’t wrap our application into our AppStateProvider, so we can
omit it. To do this, pass an empty object that we’ll cast to AppStateContextProps
to createContext function. Here we use an as operator to make TypeScript think
that our empty object actually has AppStateContextProps type:
 */
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

/**
 * @ children prop as a required field to make it clear
 * @ that the AppStateProvider is supposed to wrap other components
 */
type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

/**
 * @ CUSTOM HOOK - Make easier to access "lists" and "getTasksByListId" data
 * @ Get "draggedItem" data as well
 * @ Inside this hook, we’ll get the value from the AppStateContext using the useContext
   hook and return the result.
 */
export const useAppState = () => {
  return useContext(AppStateContext);
};

/**
 * COMPONENT - Define the AppStateProvider
 * Inside of this component we defined the 'lists' const and the 'getTasksByListId'  function.We will pass them through the value prop of the 'AppStateContext.Provider'
   to make them available to all the context consumers.
 * Our component will accept children as a prop, because we want to be able to wrap
   components into the 'AppStateProvider'. So we specify its type as FC or (React.FC).
 * Go to src/index.tsx and wrap the App component into the AppStateProvider.
 */
export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    // Replace the REACT useReducer hook by useImmerReducer from ImmerJS library
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    // State managment value from the reducer
    // Provides the 'draggedItem' and 'lists' through the context
    const { draggedItem, lists } = state;

    /**
     * Method to get Task by List ID
     */
    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    /**
     * @ Call our save method with the value of the state every time the'state' is updated.
     */
    useEffect(() => {
      save(state);
    }, [state]);

    return (
      // value: Come from AppStateContextProps properties
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);
