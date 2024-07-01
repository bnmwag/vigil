"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { motion } from "framer-motion";
import { type FC, useState } from "react";

import { cn } from "@/lib/utils";
import { RegistrationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { type SubmitHandler, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Inputs = z.infer<typeof RegistrationSchema>;
type FieldName = keyof Inputs;

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    description: "Enter your personal information below. This information will be used to create your account.",
    fields: ["firstName", "lastName", "email"],
  },
  {
    id: "Step 2",
    name: "Organization Information",
    description: "Enter your organization information below. This information will be used to create your account.",
    fields: ["orgName", "orgSubdomain", "orgColorScheme"],
  },
  {
    id: "Step 3",
    name: "Complete",
    description:
      "You have successfully completed the registration process. Please check your email for further instructions.",
  },
];

const defaultColorSchemes = [
  {
    name: "Dark Design",
    colors: { primary: "#0A0A0A", secondary: "#a855f7" },
  },
  {
    name: "Light Design",
    colors: { primary: "#FFFFFF", secondary: "#a855f7" },
  },
  {
    name: "Blue Design",
    colors: { primary: "#0000FF", secondary: "#a855f7" },
  },
];

export const RegistrationForm: FC = () => {
  const [previousStep, setPreviousStep] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: "",
      email: "",
      lastName: "",
      orgName: "",
      orgSubdomain: "",
      orgColorScheme: defaultColorSchemes[0].colors,
    },
  });

  const { handleSubmit, reset, trigger } = form;

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col space-y-12 md:space-y-0 md:grid md:grid-cols-[250px,1fr]">
      <nav aria-label="Progress">
        <ol className="flex space-x-2 md:space-x-0 md:block">
          {steps.map((step, index) => (
            <li key={step.name} className="flex-1 md:flex-shrink-0">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-t-2 border-l-0 md:border-l-2 md:border-t-0 border-brand-600 py-0 pt-4 md:py-2 md:pl-4 transition-colors">
                  <span className="text-sm font-medium text-brand-600 transition-colors">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-t-2 border-l-0 md:border-l-2 md:border-t-0 border-brand-600 py-0 pt-4 md:py-2 md:pl-4 transition-colors"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-brand-600">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-t-2 border-l-0 md:border-l-2 md:border-t-0 border-neutral-500 py-0 pt-4 md:py-2 md:pl-4 transition-colors">
                  <span className="text-sm font-medium text-neutral-500 transition-colors">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form className="max-md:mt-12 max-md:py-12">
          {currentStep === 0 && (
            <motion.div
              initial={{ y: delta >= 0 ? "15%" : "-15%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="mb-2 text-xl font-bold dark:text-white">{steps[0].name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{steps[0].description}</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ y: delta >= 0 ? "15%" : "-15%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="mb-2 text-xl font-bold dark:text-white">{steps[1].name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{steps[1].description}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="orgName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
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
                  name="orgSubdomain"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Organization Subdomain</FormLabel>
                      <FormControl>
                        <Input placeholder="Organization Subdomain" {...field} />
                      </FormControl>
                      <FormDescription>The subdomain where your instance will be living.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orgColorScheme"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Organization Color Schema</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(e) => {
                            field.onChange(e);
                            console.log(e);
                          }}
                          defaultValue={JSON.stringify(field.value)}
                          className="gap-x-2 grid grid-cols-3"
                        >
                          {defaultColorSchemes.map((scheme) => {
                            const isActive =
                              scheme.colors.primary === field.value.primary &&
                              scheme.colors.secondary === field.value.secondary;

                            return (
                              <Label key={crypto.randomUUID()}>
                                <Card className={cn(isActive && "ring-2 ring-neutral-500")}>
                                  <CardHeader className="grid grid-cols-2 !h-24 gap-x-2 space-y-0 ">
                                    <div className="rounded-sm h-full" style={{ background: scheme.colors.primary }} />
                                    <div
                                      className="rounded-sm h-full"
                                      style={{ background: scheme.colors.secondary }}
                                    />
                                  </CardHeader>
                                  <CardContent>
                                    <RadioGroupItem
                                      value={scheme.colors as unknown as string}
                                      id="option-one"
                                      className="hidden"
                                    />
                                    {scheme.name}
                                  </CardContent>
                                </Card>
                              </Label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Choose a color scheme for your organization. This will be used as the primary and secondary
                        colors for your organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <>
              <h3 className="mb-2 text-xl font-bold dark:text-white">{steps[2].name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{steps[2].description}</p>
            </>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div className="mt-8 pt-5 col-start-2">
        <div className="flex justify-between">
          <Button type="button" onClick={prev} disabled={currentStep === 0} variant={"outline"}>
            <ChevronLeftIcon className="h-4 w-4" />
            Step back
          </Button>
          <Button type="button" onClick={next} disabled={currentStep === steps.length - 1}>
            Next step
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
