import styled from "styled-components";

/** It will help us to arrange the columns horizontally. It is going
to wrap the whole application. */
export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`;

/** It will make the column title bold and add paddings to it. */
export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

/** Item button props */
type AddItemButtonProps = {
  dark?: boolean;
};

/** Mke sure to define "button<AddItemButtonProps>" to work with changed props value*/
export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`;

/** Form container */
export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

/** create button */
export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`;

/** Define our input style */
export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;

/**
 * Hidden or not when drag item
 */
interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}

/**
 * Hidden or not when drag item
 */
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
`;

/** It is a visual representation of a column. It will have grey
background and rounded corners. */
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 8px 8px;
  flex-grow: 0;
`;

/** It will visually represent the card. */
export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer; /*  cards are interactive so we specify cursor: pointer */
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;

/**
 * Custom container component to render the dragged item preview
 */
export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

/**
 * @ props for getting the dragged item coordinates from react-dnd
 * @ and generate the styles with the transform attribute to move the preview around.
 */
type DragPreviewWrapperProps = {
  position: {
    x: number;
    y: number;
  };
};

/**
 *
 */
export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`,
    },
  })
)<DragPreviewWrapperProps>``;
