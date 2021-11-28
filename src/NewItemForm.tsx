import { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

/**
 * onAdd() is a callback passed through AddNewItemProps.
 */
type NewItemFormProps = {
  onAdd(text: string): void;
};

/** COMPONENT - Create a new item input for and handle user input */
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  // State manage
  const [text, setText] = useState("");

  return (
    <NewItemFormContainer>
      <NewItemInput value={text} onChange={(e) => setText(e.target.value)} />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
