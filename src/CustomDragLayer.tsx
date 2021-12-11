import { useDragLayer } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { Column } from "./Column";
import { Card } from "./Card";

/**
 * Custom COMPONENT element that will represent the dragged item preview.
 * container component to render the preview.
 * @ useDragLayer - will provide us the information about the dragged item.
 * @ Column - it is going to be our dragged element
 * @ CustomDragLayerContainer - Our dragging layer, we’ll render the dragging preview inside of it.
 * @ useAppState - we will get the draggedItem from it
 */
export const CustomDragLayer = () => {
  // We get the "draggedItem" from the application state using the useAppState hook
  const { draggedItem } = useAppState();

  // We get the "currentOffset" value from the useDragLayer hook.
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
