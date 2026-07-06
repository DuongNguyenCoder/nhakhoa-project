import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useReducer, useEffect } from "react";
import { apiGetDirectory } from "../../apis/DirectoryAPI";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
    <div className="w-80 border border-orange-400 bg-white shadow-lg lg:w-96 xl:w-[425px]">
      <div className="flex flex-col divide-y">
        {dataDirectory.map((item, index) => (
          <div key={index}>
            <div
              className="flex cursor-pointer items-center justify-between bg-orange-200 px-4 py-2 shadow-xl hover:bg-orange-300"
              onClick={() => dispatch({ type: "TOGGLE", index })}
            >
              <div className="flex items-center gap-x-1">
                <Link
                  href={`/san-pham/directory?directory=${item._id}&title=${encodeURIComponent(item.title)}`}
                  className="flex items-center gap-1.5 text-wrap text-sm font-medium uppercase tracking-wide text-gray-800"
                >
                  {item.directoryPic && (
                    <img
                      src={item.directoryPic}
                      className="size-8 rounded-full md:size-7 lg:size-[30px] xl:size-[33px]"
                    />
                  )}

                  {item.title}
                </Link>
              </div>
              {openIndex === index ? (
                <MinusCircleIcon className="h-6 w-6 text-red-600" />
              ) : (
                <PlusCircleIcon className="h-6 w-6 text-green-600" />
              )}
            </div>
            {openIndex === index && (
              <div className="bg-orange-100 px-6 py-4 shadow-inner">
                <ul className="list-inside space-y-2">
                  {item.category.map((child) => (
                    <li
                      key={child._id}
                      className="flex items-center gap-1 border-b border-b-gray-300"
                    >
                      <ArrowRightCircleIcon className="size-5" />
                      <Link
                        href={`/san-pham/category?category=${child._id}&title=${encodeURIComponent(child.title)}`}
                        className="text-[17px] font-normal text-slate-900 hover:text-ellipsis hover:text-[17px] hover:font-medium hover:text-red-600"
                      >
                        {child.title}
                      </Link>
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
