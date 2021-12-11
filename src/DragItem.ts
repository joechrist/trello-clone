/**
 * @ When we begin to drag an item we have to provide information about it to react-dnd.
 * @params id: column's id
 * @params text: text that we'll get from the 'Column' component
 * @params type: column component
 */
export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};

/**
 * Type of what we want to drag
 * We Store The Dragged Item In The State in appStateReducer
 */
export type DragItem = ColumnDragItem;
