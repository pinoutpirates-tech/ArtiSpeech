import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background/80 backdrop-blur-sm hover:bg-muted hover:text-foreground transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        ghost: "hover:bg-muted hover:text-foreground transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
        voice: "bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90 font-semibold shadow-lg transition-all duration-300 hover:scale-105",
        artisan: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-secondary-muted transition-all duration-300",
        gold: "bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/80 font-medium transition-all duration-300",
        maroon: "bg-accent-maroon text-accent-maroon-foreground hover:bg-accent-maroon/90 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        voice: "h-16 w-16 rounded-full",
        wide: "h-12 px-12 py-3 w-full",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
