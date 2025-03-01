import { GeneralProps, WithChildrenProps } from "../lib/types";

export interface ButtonProps extends GeneralProps, WithChildrenProps {
  type?: "submit" | "button" | "reset";
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "tertiary";

  // Booleans
  isIcon?: boolean;
  isFullWidth?: boolean;

  // Event Handlers
  onClick?: () => void;
}
