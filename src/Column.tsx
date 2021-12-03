import { AddNewItem } from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";

/**
 * If "text?:" -  text can be string or undefined
 * id: We’ll need this value to find the corresponding tasks.
 * */
type ColumnProps = {
  text: string;
  id: string;
};

/**
 * COMPONENT - we used the React.FC type to define the children prop on our component.
 * Contain a new task (AddNewItem) in it with the column title and a Card with task
 * Grab children data of <card text="" />
 * */
export const Column = ({ text, id }: ColumnProps) => {
  // We’ll call useAppState to get the "getTasksByListId" function.
  const { getTasksByListId } = useAppState();

  // Then we use "getTasksByListId(id)" to get the tasks to show in this column
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
