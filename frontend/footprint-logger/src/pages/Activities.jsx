import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useLoaderData, NavLink, useSubmit } from "react-router";
import { z } from "zod";
import { userContext } from "../context/context"; 
import { backendApi } from "../lib/utils";


const formSchema = z.object({
  category: z.string().min(3, { message: "Please enter a valid category" }),
  activityType: z.string().min(3, { message: "Please enter a valid activity type" }),
  quantity: z.number().positive({ message: "Please enter a valid quantity" }),
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const activitiesAction = async ({ request, context }) => {
    const formData = await request.formData(); 
    //const {userId, token} = context.get(userContext); 
 //   console.log("context", userId, token)
    const category = formData.get("category"); 
    const activityType = formData.get('activityType'); 
    const quantity = formData.get('quantity') 

    try {
        const res = await backendApi("log/activity_log", {
            category, 
            mode: activityType, 
            quantity
        }, { 
            withCredentials: true,  
        }) 

        const data = res.data 
        console.log("action in logger", data)
        return

    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data.message
        }
    }

    return
};

export const activitiesLoader = async () => {
  try {
    const res = await backendApi("carbon/emission_factors");
    const { data } = res.data;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data.message || "Unknown error occurred"
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
  const [selectedActivity, setSelectedActivity] = useState("")


  const { data: carbonData } = loaderData || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  });


  useEffect(() => {
    if (!selectedCategory || !carbonData) return;
    const categoryItems = carbonData.filter(
      item => item.category === selectedCategory
    );
    setItemsFromCategory(categoryItems);
  }, [selectedCategory, carbonData]);
  
  
  useEffect(() => {
      setActivityTypes(itemsFromCategory[0]?.factors || []);
    }, [itemsFromCategory]); 

   useEffect(()=>{ 
        const activeActivity = activityTypes.find(item=>(
            item.mode == selectedActivity || 
            item.activity == selectedActivity || 
            item.item == selectedActivity
        )) 

        console.log("Active activity", activeActivity); 
        setFactor(activeActivity?.factor || 0)
        setInputUnits(activeActivity?.unit_input); 
        setOutputUnits(activeActivity?.unit_output)
   }, [activityTypes, selectedActivity])
    
  //const selectedActivityType = watch("activityType"); 
 console.log("selected activity", selectedActivity)
  const onSubmit = async formData => {
    console.log("Form data", formData); 

    const fd = new FormData(); 

    Object.entries(formData).forEach(([k, v])=>{  

        if(k == "quantity") v = (v * factor).toFixed(2); 

        fd.append(k,v); 
    })
    contributionSubmit(fd, {action: "/activities", method: "post"})

  }; 

  console.log(itemsFromCategory)

  const inputQuantity = watch("quantity")

  if (!loaderData?.success) return <p>Loading…</p>;

  return (
    <section className="flex items-center justify-center bg-green-600 h-screen">
      <div className="grid grid-rows-15 card-container lg:h-[60vh] bg-white min-w-[25vw] rounded-[5px] p-2">
        <div className="row-span-2 card-details">
          <h1 className="cart-title text-4xl text-center">Log your Carbon Activity</h1>
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
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="">--Select--</option>
                {carbonData.map(item => (
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
              <select {...register("activityType", {
                onChange: (e)=> setSelectedActivity(e.target.value)
              })} id="activityType">
                <option value="">--Select--</option>
                {activityTypes.map(item => (
                  <option key={item._id} value={item.item || item.mode || item.mode}>
                    {item.item || item.activity || item.mode}
                  </option>
                ))}
              </select>
              {errors.activityType && (
                <p className="text-red-500">{errors.activityType.message}</p>
              )}
            </article>

            <article className="flex flex-col items-start gap-2 row-span-4">
              <label htmlFor="quantity">Quantity <span className="text-green-500 font-black">{inputUnits}</span></label>
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
              <span>{(factor * inputQuantity).toFixed(2)}<span>{outputUnits}</span></span>
        </div>
      </div>
    </section>
  );
}

export default Activities;
