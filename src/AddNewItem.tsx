import { useState } from "react";
import { AddItemButton } from "./styles";
import { NewItemForm } from "./NewItemForm";

/**
 * onAdd(): callback function called when we click the Create item button
 * toggleButtonText: the text we’ll render when this component is a button.
 * dark: a flag that we’ll pass to the styled component.
 */
type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
};

/** */
export const AddNewItem = ({
  onAdd,
  toggleButtonText,
  dark,
}: AddNewItemProps) => {
  // Manage state
  const [showForm, setShowForm] = useState(false);
  // const { onAdd, toggleButtonText, dark } = props;

  /**
   * We show item creation form here when user clicked on create button
   */
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
