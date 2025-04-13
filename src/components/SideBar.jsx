import { apiGetDirectory } from '@/apis/DirectoryAPI';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useReducer, useState } from 'react'

const SideBar = () => {  
  // API GET DIRECTORY
    const [dataDirectory, setDataDirectory] = useState([]);
    useEffect(() => {
      const getDirectory = async () => {
        const response = await apiGetDirectory();
        console.log(response);
        setDataDirectory(response.data.data);
      }
      getDirectory();
    }, [])
  // END
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
      // <div className="h-auto w-full items-center">
        <div
          className="w-full h-auto items-center"
        >
          <div className="flex h-10 items-center justify-center bg-red-800">
            <h2 className="text-center font-bold text-white">
              DANH SÁCH SẢN PHẨM
            </h2>
          </div>
          
            <div className="flex flex-col divide-y">
              {dataDirectory.map((item, index) => (
                <div key={index}>
                  <div
                    className="flex cursor-pointer items-center justify-between bg-orange-200 px-4 py-2 hover:bg-orange-300"
                    onClick={() => dispatch({ type: "TOGGLE", index })}
                  >
                    <div className="flex items-center gap-x-1">
                      {/* {item.image && <img src={item.image} className="size-8" />} */}
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
    );
}

export default SideBar
