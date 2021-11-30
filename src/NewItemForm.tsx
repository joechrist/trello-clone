import { useState } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

/**
 * onAdd() is a callback passed through AddNewItemProps.
 */
type NewItemFormProps = {
  onAdd(text: string): void;
};

/** COMPONENT - Create a new item input for and handle user input with "Create" button */
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  // State manage
  const [text, setText] = useState("");

  /**
   * Submit the input on an "Enter" key press, so that the items could be created by pressing the Enter key instead of clicking the Create button.
   */
  const handleAddTextWithEnterButton = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      onAdd(text);
    }
  };

  // A reference to the input element
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddTextWithEnterButton}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
