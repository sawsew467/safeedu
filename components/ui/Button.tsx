import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow hover:bg-primary/90",
        default: "bg-[#eaeaea] hover:bg-primary/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-12 px-4 ",
        sm: "h-10 rounded-2xl px-3",
        lg: "h-14 rounded-2xl px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const textVariants = cva("text-center", {
  variants: {
    variant: {
      default: "text-[#646464]",
      primary: "text-white",
      outline: "text-secondary-foreground",
    },
    size: {
      default: "text-xs",
      sm: "text-xs",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  textClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      textClassName,
      children,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : TouchableOpacity;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <Text className={cn(textVariants({ variant, size }), textClassName)}>
          {children}
        </Text>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
