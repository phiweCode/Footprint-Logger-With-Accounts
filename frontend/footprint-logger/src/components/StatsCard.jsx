import React from "react";

function StatsCard({ ...props }) {
  const { title, value } = props;

  return (
    <div className="border border-gray-800 min-w-[200px] p-5 rounded-sm">
      <article className="title ">
        <p className="text-sm text-gray-600">{title}</p>
      </article>
      <article className="value flex flex-rows items-center justify-start gap-3">
        <p
          className={
            "value font-medium text-green-600 text-2xl " +
            (value >= 1 && title == "You Vs Community" && "text-red-500")
          }
        >
          {value && value.toFixed(2)}
        </p>
        {title !== "You Vs Community" ? (
          <span className="font-normal text-gray-400 text-[1em]">
            kg CO<sub>2</sub>e{" "}
          </span>
        ) : (
          <span className="font-normal text-gray-400 text-[1em]">%</span>
        )}
      </article>
    </div>
  );
}

export default StatsCard;
