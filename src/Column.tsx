import { useRef } from "react";
import { AddNewItem } from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { addTask, moveTask, moveList, setDraggedItem } from "./state/actions";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";

/**
 * If "text?:" -  text can be string or undefined
 * id: We’ll need this value to find the corresponding tasks.
 * isPreview?: - To fix or prevent The Column Preview From Hiding
 * */
type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

/**
 * COMPONENT - we used the React.FC type to define the children prop on our component.
 * Contain a new task (AddNewItem) in it with the column title and a Card with task
 * Grab children data of <card text="" />
 * */
export const Column = ({ text, id, isPreview }: ColumnProps) => {
  // We’ll call useAppState to get the "getTasksByListId" function.
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  // Then we use "getTasksByListId(id)" to get the tasks to show in this column
  const tasks = getTasksByListId(id);

  // Define the ref that will hold the reference to the dragged "div" element.
  // Here the <div> element
  const ref = useRef<HTMLDivElement>(null);

  //
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    },
  });

  // Get the drag connector function from the useItemDrag
  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  // Pass the "ref" to the drag function and also pass it as a prop to the ColumnContainer
  // Combine drag and drop calls
  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
