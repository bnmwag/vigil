import type { FC } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface IFormErrorProps {
  message?: string;
}

export const FormError: FC<IFormErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 flex rounded-md items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};
