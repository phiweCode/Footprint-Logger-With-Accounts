import React from 'react'

function ActivityForm() {
  return (
   <Card className="min-w-[400px]">
        <CardHeader>
          <CardTitle className="font-black text-3xl">
            {" "}
            Log your Carbon Activity{" "}
          </CardTitle>
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
                                  (item) => item.category === field.value
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
                                    setValue("category", item.category);
                                    setSelectedCategory(item.category);
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
                        <p className="text-red-500">
                          {errors.category.message}
                        </p>
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
                              ? activityTypes.find(
                                  (item) => item.item === field.value
                                )?.item ||
                                activityTypes.find(
                                  (item) => item.activity === field.value
                                )?.activity ||
                                activityTypes.find(
                                  (item) => item.mode === field.value
                                )?.mode
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
                                  value={
                                    item.item || item.mode || item.activity
                                  }
                                  onSelect={() => {
                                    setValue(
                                      "activityType",
                                      item.item || item.mode || item.activity
                                    );
                                    setSelectedActivity(
                                      item.item || item.mode || item.activity
                                    );
                                  }}
                                >
                                  {item.item || item.mode || item.activity}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      (item.item ||
                                        item.mode ||
                                        item.activity) === field.value
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
                        <p className="text-red-500">
                          {errors.activityType.message}
                        </p>
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
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      {errors.quantity && (
                        <span className="text-red-500">
                          {errors.quantity.message}
                        </span>
                      )}
                      {!actionData?.success && (
                        <span className="text-red-600">
                          {actionData?.message}
                        </span>
                      )}
                      {actionData?.success && (
                        <span className="text-green-600">
                          {actionData?.message}
                        </span>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"w-full flex items-center justify-center"}>
          <div className="row-span-3 text-center card-footer">
            <h2>Estimated contribution: </h2>
            <span className="w-full flex justify-between items-center text-green-500 font-black ml-1.5">
              <p>{(factor * inputQuantity).toFixed(2)}</p>
              <span className="text-gray-800">{outputUnits}</span>
            </span>
          </div>
        </CardFooter>
      </Card>
  )
}

export default ActivityForm
