export interface LinkDTO {
  variant?: "primary" | "secondary" | "icon" | "underline";
  href: string;
  label: string;
  newTab: boolean;
  isHidden: boolean;
}
