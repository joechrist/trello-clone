import React from "react";
import { CardContainer } from "./styles";

/**
 * text: Text inside a card
 * id: Link the components with the corresponding data we’ll need to pass the id to them
 */
type CardProps = {
  text: string;
  id: string;
};

/** COMPONENT - */
export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
