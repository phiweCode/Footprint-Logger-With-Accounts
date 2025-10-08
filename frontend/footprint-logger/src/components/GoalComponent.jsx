import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router";
import z from "zod";

const formSchema = z.object({
  goal: z
    .number({
      required_error: "Goal is required",
      invalid_type_error: "Please enter a valid number.",
    })
    .positive({ message: "Please enter a valid quantity." }),
});

function GoalComponent({ goal}) {
  const [edit, setEdit] = useState(false);  
  const { weeklyLimitGoal, endsAt, createdAt, _id: goalId } = goal[0] || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { goal: weeklyLimitGoal || 0},
  });

  const goalSubmitHandler = useSubmit()

  useEffect(() => {
    if (goal?.length) {
      reset({ goal: goal[0].weeklyLimitGoal });
    }
  }, [goal, reset]);

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append("goal", data.goal);
      fd.append("_intent", "Update Goal");

      console.log("Submitting Goal:", Object.fromEntries(fd));
      await goalSubmitHandler(fd, { action: "/activities", method: "post" });

      setEdit(false);
    } catch (err) {
      console.error("Error submitting goal:", err);
    }
  }; 

  const deleteGoal = () => async (e) => { 
    try {
      const fd = new FormData(); 
      
      fd.append("goalId", goalId);
      fd.append("_intent", "Delete Goal");

      console.log("Delete Goal:", Object.fromEntries(fd));
      await goalSubmitHandler(fd, { action: "/activities", method: "post" }); 
      setEdit(false); 

    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  }

  return (
   goal?.length !== 0 ? 
      (<div className="h-auto min-w-[300px] max-w-md p-4 border rounded-lg shadow-md flex flex-col items-center">
      <h1 className="font-black text-2xl mb-4">Your current goal</h1> 
      <article>
        <p className="font-black text-9xl text-green-600 ">{weeklyLimitGoal}</p>
      </article>

      <div className="goal-form">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-wrapper flex gap-1.5 flex-row-reverse">
            <Input
              type="number"
              step="any"
              {...register("goal", { valueAsNumber: true })}
              onFocus={() => setEdit(true)}
              onBlur={(e) => {
                if (!e.target.value) setEdit(false);
              }}
              className="border-0 font-black"
            />
          </div>

          {errors.goal && (
            <p className="text-red-500 text-sm">{errors.goal.message}</p>
          )}

          {edit && (
            <Button type="submit" className="mt-2">
              Change
            </Button>
          )}

          {edit && (
            <Button type="button" onClick={deleteGoal()} className="mt-2">
              Delete
            </Button>
          )}
        </form>

        <p className="createdAt">Created: {createdAt?.split("T")[0]}</p>
        <p className="createdAt">Ends On: {endsAt?.split("T")[0]}</p>
      </div>
    </div>) : (

      <div className="h-auto min-w-[300px] max-w-md p-4 border rounded-lg shadow-md flex flex-col items-center">
        <h1 className="font-black text-2xl mb-4">No current goal set</h1> 
        <p className="text-center">Set a weekly carbon footprint goal to help track and reduce your emissions.</p>
         <div className="goal-form">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="input-wrapper flex gap-1.5 flex-col">
            <label htmlFor="goal">Create new goal</label>
            <Input
              type="number"
              step="any"
              {...register("goal", { valueAsNumber: true })}
              onFocus={() => setEdit(true)}
              onBlur={(e) => {
                if (!e.target.value) setEdit(false);
              }}
              className="border-0 font-black"
            />
          </div>

          {errors.goal && (
            <p className="text-red-500 text-sm">{errors.goal.message}</p>
          )}

            <Button type="submit" className="">
              Create New Goal
            </Button>
         
        </form>
      </div>
      </div>
    
  
    )
);
}

export default GoalComponent;
