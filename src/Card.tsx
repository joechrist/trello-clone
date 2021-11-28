import React from "react";
import { CardContainer } from "./styles";

/** Text inside a card */
type CardProps = {
  text: string;
};

/** COMPONENT - */
export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
