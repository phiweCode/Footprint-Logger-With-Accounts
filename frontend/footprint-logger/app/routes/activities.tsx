import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "./+types/activities";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Factor schema
const factorsSchema = z.object({
  _id: z.string(),
  mode: z.string().optional(),
  activity: z.string().optional(),
  item: z.string().optional(),
  icon: z.string(),
  factor: z.coerce.number().int().positive(),
  unit_input: z.string(),
  unit_output: z.string(),
  description: z.string(),
  default_input: z.coerce.number(),
});

// Form schema
const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category" }),
  mode: z.string().optional(),
  activity: z.string().optional(),
  item: z.string().optional(),
  estimatedContribution: z.number().positive({
    message: "Your contribution cannot be negative",
  }),
});

// Data schema
const dataSchema = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      category: z.string(),
      factors: z.array(factorsSchema),
    })
  ),
});

// Loader function
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const res = await axios.get(`${BACKEND_URL}/emission_factors`);
    if (res) return res.data;
  } catch (error: any) {
    throw Error(error.message);
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

type FormValues = z.infer<typeof formSchema>;

function Activities({ loaderData }: Route.ComponentProps) {
  const { data }: z.infer<typeof dataSchema> = loaderData;

  const [units, setUnits] = useState<string>("");
  const [factor, setFactor] = useState<number>(0);
  const [oUnits, setOUnits] = useState<string>("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      mode: "",
      estimatedContribution: 0,
    },
  });

  const { watch } = form;

  const category = watch("category");
  const mode = watch("mode");
  const contribution = watch("estimatedContribution");

  // Update units whenever category or mode changes
  useEffect(() => {
    if (!category || !mode) {
      setUnits("");
      return;
    }

    const factor = data
      .find((cat) => cat.category === category)
      ?.factors.find(
        (f) => f.mode === mode || f.activity === mode || f.item === mode
      );

    setFactor(factor?.factor || 0)
    setUnits(factor?.unit_input || "");
    setOUnits(factor?.unit_output || "");
  }, [category, mode, data]);

  const onSubmit = (formData: FormValues) => {
    axios.post( )
  };

  return (
    <div className="bg-green-800 h-screen grid items-center justify-center">
      <Card className="w-150">
        <CardHeader>
          <CardTitle className="text-center">
            <p className="font-black text-4xl">Log Your Activity</p>
          </CardTitle>
          <CardDescription className="text-center">
            Let's track your carbon footprint. Try logging your activities to
            estimate your impact.
          </CardDescription>
          <CardAction>x</CardAction>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full border-green-300">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {data.map((cat) => (
                              <SelectItem
                                key={cat._id}
                                className="active:bg-green-300"
                                value={cat.category}
                              >
                                {cat.category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mode / Activity Type */}
              {category && (
                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-green-300">
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Activities</SelectLabel>
                              {data
                                .find((cat) => cat.category === category)
                                ?.factors.map((factor) => (
                                  <SelectItem
                                    key={factor._id}
                                    className="active:bg-green-300"
                                    value={
                                      factor.mode ||
                                      factor.activity ||
                                      factor.item ||
                                      ""
                                    }
                                  >
                                    {factor.mode ||
                                      factor.activity ||
                                      factor.item}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Estimated Contribution with units */}
              {mode && (
                <FormField
                  control={form.control}
                  name="estimatedContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value and Unit</FormLabel>
                      <FormControl>
                        <div className="input grid grid-cols-10">
                          <Input
                            type="number"
                            className="col-span-6"
                            {...field} // keeps RHF value in sync
                             onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                          <span className="grid items-center ml-4 font-black w-full col-span-4 text-green-700">
                            {units}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <CardFooter className="grid grid-cols-2 ">
              <div className="w-auto">
                 <p>Your estimated output</p>
                <p className="font-black text-green-700">{(contribution * factor).toFixed(2)}{" "}{oUnits}</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Submit
                </button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Activities;
