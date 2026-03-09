import { cn } from "@/utils/cn";
import { Text, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  variant?:
    | "display-lg"
    | "display-md"
    | "heading-lg"
    | "heading-md"
    | "body-lg"
    | "body-md"
    | "body-sm"
    | "caption"
    | "button"
    | "label";
  className?: string;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extra";
  color?: string;
}

export function Typography({
  variant = "body-md",
  className,
  weight,
  color,
  children,
  ...props
}: TypographyProps) {
  const variantStyles = {
    "display-lg": "text-display-lg font-extrabold",
    "display-md": "text-display-md font-bold",
    "heading-lg": "text-heading-lg font-bold",
    "heading-md": "text-heading-md font-semibold",
    "body-lg": "text-body-lg font-normal",
    "body-md": "text-body-md font-normal",
    "body-sm": "text-body-sm font-normal",
    caption: "text-caption font-normal",
    button: "text-button font-semibold",
    label: "text-label font-medium",
  };

  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extra: "font-extrabold",
  };

  return (
    <Text
      className={cn(
        variantStyles[variant],
        weight ? weightStyles[weight] : "",
        color ? (color.startsWith("text-") ? color : `text-${color}`) : "",
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  );
}
