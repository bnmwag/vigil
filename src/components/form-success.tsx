import type { FC } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface IFormSuccessProps {
  message?: string;
}

export const FormSuccess: FC<IFormSuccessProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 flex rounded-md items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};
