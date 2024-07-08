import React from "react";

export default function Column() {
  return (
    <div className="flex flex-col w-[350px] min-h-[620px] bg-gray-700 font-bold rounded-md border  border-gray-900">
      {/*
      heading
    */}
      <div className="flex rounded-t-md items-center text-xl justify-center h-16 px-1 py-1 mb-2 bg-gray-800">
        TODO
      </div>
      {/*
        tasks container
      */}
      <div className="flex flex-1 px-1 flex-col">
        {/*
        task container
      */}
        <div className="mb-1 bg-gray-900 rounded-md  px-4 py-2">
          {/*
        task content
      */}
          <p className="text-base font-medium">task one</p>
        </div>
      </div>
    </div>
  );
}
