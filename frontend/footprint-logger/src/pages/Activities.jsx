import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useLoaderData, useSubmit } from "react-router";
import { z } from "zod";
import { backendApi } from "../lib/utils"; 

import { Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner" 

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  category: z.string().min(3, { message: "Please enter a valid category." }),
  activityType: z
    .string()
    .min(3, { message: "Please enter a valid activity type." }),
  quantity: z.number().positive({ message: "Please enter a valid quantity." }),
});

export const activitiesAction = async ({ request, context }) => {
  const formData = await request.formData();
  const category = formData.get("category");
  const activityType = formData.get("activityType");
  const quantity = formData.get("quantity");

  try {
    const res = await backendApi.post(
      "log/activity_log",
      {
        category,
        mode: activityType,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const data = res.data;
    console.log("action in logger", data);
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message,
    };
  }

  return;
};

export const activitiesLoader = async () => {
  try {
    const res = await backendApi("carbon/emission_factors");
    const { data } = res.data;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message || "Unknown error occurred",
    };
  }
};

function Activities() {
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const contributionSubmit = useSubmit();

  const [activityTypes, setActivityTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemsFromCategory, setItemsFromCategory] = useState([]);
  const [factor, setFactor] = useState(0);
  const [inputUnits, setInputUnits] = useState("");
  const [outputUnits, setOutputUnits] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  const { data: carbonData } = loaderData || {};

  const {
    register,
    handleSubmit,
    control, 
    watch,
    setValue, 
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!selectedCategory || !carbonData) return;
    const categoryItems = carbonData.filter(
      (item) => item.category === selectedCategory
    );
    setItemsFromCategory(categoryItems);
  }, [selectedCategory, carbonData]);

  useEffect(() => {
    setActivityTypes(itemsFromCategory[0]?.factors || []);
  }, [itemsFromCategory]);

  useEffect(() => {
    const activeActivity = activityTypes.find(
      (item) =>
        item.mode == selectedActivity ||
        item.activity == selectedActivity ||
        item.item == selectedActivity
    );

    setFactor(activeActivity?.factor || 0);
    setInputUnits(activeActivity?.unit_input);
    setOutputUnits(activeActivity?.unit_output);
  }, [activityTypes, selectedActivity]);

  const onSubmit = async (formData) => {
    const fd = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (k == "quantity") v = (v * factor).toFixed(2);
      fd.append(k, v);
    });

    contributionSubmit(fd, { action: "/activities", method: "post" });
    reset()
  };

  const inputQuantity = watch("quantity")

  if (!loaderData?.success) return <p>Loading…</p>;

  return (
    <section className="flex items-center justify-center  h-screen">
      {/* <div className="grid grid-rows-15 card-container lg:h-[60vh] bg-white min-w-[25vw] rounded-[5px] p-2">
        <div className="row-span-2 card-details">
          <h1 className="cart-title text-4xl text-center">
            Log your Carbon Activity
          </h1>
          <p className="card-description text-center pt-4">
            welcome back to footprint logger !
          </p>
        </div>

        <div className="row-span-10 flex items-center w-full h-full card-content justify-center">
          <form
            className="grid grid-rows-auto w-full p-15"
            onSubmit={handleSubmit(onSubmit)}
          >
            <article className="flex flex-col items-start gap-2 row-span-4">
              <label htmlFor="category">Choose a category</label>
              <select
                {...register("category")}
                id="category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">--Select--</option>
                {carbonData.map((item) => (
                  <option key={item.category} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </article>

            <article className="flex flex-col items-start gap-2 row-span-4">
              <label htmlFor="activityType">Choose your activity type</label>
              <select
                {...register("activityType", {
                  onChange: (e) => setSelectedActivity(e.target.value),
                })}
                id="activityType"
              >
                <option value="">--Select--</option>
                {activityTypes.map((item) => (
                  <option
                    key={item._id}
                    value={item.item || item.mode || item.mode}
                  >
                    {item.item || item.activity || item.mode}
                  </option>
                ))}
              </select>
              {errors.activityType && (
                <p className="text-red-500">{errors.activityType.message}</p>
              )}
            </article>

            <article className="flex flex-col items-start gap-2 row-span-4">
              <label htmlFor="quantity">
                Quantity{" "}
                <span className="text-green-500 font-black">{inputUnits}</span>
              </label>
              <input
                type="number"
                defaultValue={1}
                {...register("quantity", { valueAsNumber: true })}
                className="border border-blue-900 p-2 w-full"
              />
              {errors.quantity && (
                <p className="text-red-500">{errors.quantity.message}</p>
              )}
              {!actionData?.success && (
                <p className="text-red-600">{actionData?.message}</p>
              )}
            </article>
            <article className="row-span-2 button-wrapper flex justify-center h-full pt-2">
              <button type="submit" className="bg-black text-white w-full h-8">
                submit
              </button>
            </article>
          </form>
        </div>

        <div className="row-span-3 text-center card-footer">
          <h2>Estimated contribution</h2>
          <span>
            {(factor * inputQuantity).toFixed(2)}
            <span>{outputUnits}</span>
          </span>
        </div>
      </div> */}
      <Card>
  <CardHeader>
    <CardTitle>  Log your Carbon Activity </CardTitle>
    <CardDescription>welcome back to footprint logger !</CardDescription>
  </CardHeader>
  <CardContent>
<Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? carbonData.find(
                            item => item.category === field.value
                          )?.category
                        : "Select Category"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-ful"
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {carbonData.map((item) => (
                          <CommandItem
                            value={item.category}
                            key={item.category}
                            onSelect={() => {
                              setValue("category", item.category) 
                              setSelectedCategory(item.category)
                            }} 
                           className={"w-full"}
                          >
                            {item.category}
                            <Check
                              className={cn(
                                "ml-auto",
                                item.category === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="activityType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Activity Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ?(activityTypes.find(
                            item => item.item === field.value
                          )?.item || 
                         activityTypes.find(
                            item => item.activity === field.value
                          )?.activity || 
                         activityTypes.find(
                            item => item.mode === field.value
                          )?.mode )
                        : "Select mode"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9 w-full"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {activityTypes.map((item) => (
                          <CommandItem
                            key={item._id}
                            value={item.item || item.mode || item.activity}
                            onSelect={() => {
                              setValue("activityType", item.item || item.mode || item.activity)
                              setSelectedActivity(item.item || item.mode || item.activity)
                            }}
                          >
                            {item.item || item.mode || item.activity}
                            <Check
                              className={cn(
                                "ml-auto",
                                (item.item || item.mode || item.activity)=== field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {errors.activityType && (
                <p className="text-red-500">{errors.activityType.message}</p>
              )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
  control={control}
  name="quantity"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Quantity</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          value={field.value ?? Number(1)}     
          onChange={e => field.onChange(+e.target.value)} 
        />
      </FormControl>
      <FormDescription>
        {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
        {!actionData?.success && <span className="text-red-600">{actionData?.message}</span>}
        {actionData?.success && <span className="text-green-600">{actionData?.message}</span>}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </CardContent>
  <CardFooter className={"w-full"}>
    <div className="row-span-3 text-center card-footer w-full">
          <h2>Estimated contribution</h2>
          <span className="w-full">
            {(factor * inputQuantity).toFixed(2)}
            <span>{outputUnits}</span>
          </span>
        </div>
  </CardFooter>
</Card>

      
      

    </section>
  );
}

export default Activities;
