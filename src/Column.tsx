import React from "react";
import { AddNewItem } from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";

/**
 * If "text?:" -  text can be string or undefined
 * */
type ColumnProps = {
  text: string;
  children?: React.ReactNode; // We can manually add this for the children props
};

/**
 * COMPONENT - we used the React.FC type to define the children prop on our component.
 * Contain a new task (AddNewItem) in it with the column title and a Card with task
 * Grab children data of <card text="" />
 * */
export const Column: React.FC<ColumnProps> = ({
  text,
  children,
}: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
