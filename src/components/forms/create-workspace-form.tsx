"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { type FC, useState, useTransition } from "react";

import { CreateWorkspaceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightIcon, UpdateIcon } from "@radix-ui/react-icons";

import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createWorkspace } from "@/actions/create-workspace";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const loadingStates = [
  { text: "Validating workspace inputs" },
  { text: "Deploying instantiated database" },
  { text: "Creating workspace configuration" },
  { text: "Finishing workspace" },
];

export const CreateWorkspaceForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: { name: "", subdomain: "" },
  });

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof CreateWorkspaceSchema>) => {
    startTransition(async () => {
      createWorkspace(values)
        .then((data) => {
          console.log(data);
          

          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Something went wrong"))
    });
  });

  return (
    <section className="flex flex-col space-y-12">
      <Loader loadingStates={loadingStates} loading={isPending} duration={500} />
      <Form {...form}>
        <form className="max-md:mt-12 max-md:py-12 max-w-screen-md w-full mx-auto" onSubmit={onSubmit}>
          <fieldset disabled={isPending} className="max-w-md">
            <h3 className="mb-2 text-xl font-bold dark:text-white">Create your workspace</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Create your workspace to start collaborating with your team.
            </p>
            <div className="mt-10 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization Name" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name of your Organization.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subdomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Subdomain</FormLabel>
                    <FormControl>
                      <Input placeholder="Organization Subdomain" {...field} />
                    </FormControl>
                    <FormDescription>The subdomain where your instance will be living.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset disabled={isPending} className="mt-12">
            <Button type="submit">
              {isPending ? (
                <>
                  <span className="mr-2">Creating Workspace...</span>
                  <UpdateIcon className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <span className="mr-2">Create Workspace</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </fieldset>
        </form>
      </Form>
      <FormError message={error} />
          <FormSuccess message={success} />
    </section>
  );
};
