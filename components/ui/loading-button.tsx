"use client";

import { forwardRef } from "react";
import { Button, type ButtonProps } from "./button";

import { cn } from "@/lib/utils";
// import { Spinner } from "@heroui/spinner";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton = forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    { loading = false, className, children, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(className, "relative")}
      >
        {/* load spinner if the form status is loading, else show subscribe text */}
        {loading ? (
          <div className="absolute inset-0 flex justify-center gap-x-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("animate-spin")}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        ) : (
          <span className={cn(loading ? "opacity-0" : "")}>
            {children}
          </span>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
