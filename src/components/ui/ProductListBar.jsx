import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useReducer, useEffect } from "react";
import { apiGetDirectory } from "@/apis/DirectoryAPI";

const ProductListBar = () => {
  // API GET DIRECTORY
  const [dataDirectory, setDataDirectory] = useState([]);
  useEffect(() => {
    const getDirectory = async () => {
      const response = await apiGetDirectory();
      console.log(response);
      setDataDirectory(response.data.data);
    };
    getDirectory();
  }, []);
  // END
  useEffect(() => {
    dispatch({ type: "SET", index: -1 });
  }, []);
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE":
        return state === action.index ? -1 : action.index;
      case "SET":
        return action.index;
      default:
        return state;
    }
  };
  const [openIndex, dispatch] = useReducer(reducer, -1);

  return (
    <div className="w-80 lg:w-96 xl:w-[425px] bg-white border border-orange-400 shadow-lg">
      <div className="flex flex-col divide-y">
        {dataDirectory.map((item, index) => (
          <div key={index}>
            <div
              className="flex cursor-pointer items-center justify-between bg-orange-200 px-4 py-2 shadow-xl hover:bg-orange-300"
              onClick={() => dispatch({ type: "TOGGLE", index })}
            >
              <div className="flex items-center gap-x-1">
                <span>{item.title}</span>
              </div>
              {openIndex === index ? (
                <MinusCircleIcon className="h-5 w-5 text-red-600" />
              ) : (
                <PlusCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </div>
            {openIndex === index && (
              <div className="bg-orange-100 px-6 py-4 shadow-inner">
                <ul className="list-inside list-disc space-y-1">
                  {item.category.map((child) => (
                    <li key={child.id}>
                      <a
                        href={child.url}
                        className="text-[16px] text-slate-900 hover:text-ellipsis hover:text-[17px] hover:font-medium hover:text-red-600"
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default ProductListBar;
