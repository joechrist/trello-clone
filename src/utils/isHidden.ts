import { DragItem } from "../DragItem";

/**
 * @ Helper method to calculate if we need to hide the column
 * @ compares the type and id of the currently dragged item with the type
     and id we pass to it as arguments
 * @param draggedItem
 * @param itemType type of the current item
 * @param id the current dragged item id
 * @returns true or false
 */
export const isHidden = (
  draggedItem: DragItem | null,
  itemType: string,
  id: string
): boolean => {
  return Boolean(
    draggedItem && draggedItem.type === itemType && draggedItem.id === id
  );
};
