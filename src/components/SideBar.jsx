import { apiGetDirectory } from '@/apis/DirectoryAPI';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {  
  // API GET DIRECTORY
    const [dataDirectory, setDataDirectory] = useState([]);
    useEffect(() => {
      const getDirectory = async () => {
        const response = await apiGetDirectory();
        console.log("API GET DIRECTORY: ", response);
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
          className="w-full h-auto flex flex-col"
        >
          <div className="flex h-10 items-center justify-center bg-red-700">
            <h2 className="text-center font-bold text-white">
              DANH SÁCH SẢN PHẨM
            </h2>
          </div>
          
            <div className="flex flex-col h-full divide-y">
              {dataDirectory.map((item, index) => (
                <div 
                  key={index}
                  className='h-full border-t-orange-300 bg-orange-100'
                >
                  <div
                    className="flex cursor-pointer items-center justify-between bg-orange-200 px-4 py-2 hover:bg-orange-300"
                    onClick={() => dispatch({ type: "TOGGLE", index })}
                  >
                    <div className="flex items-center w-full gap-x-3 md:gap-x-2 lg:gap-x-2.5">
                      {item.directoryPic && <img src={item.directoryPic} className="lg:size-[30px] xl:size-[33px] rounded-full md:size-7 size-8" />}
                      <Link to={`/products/directory?directory=${item._id}`} className='font-medium text-sm uppercase tracking-wide text-gray-800 text-wrap'>
                        {item.title}
                      </Link>
                      {/* <span className='font-medium text-sm uppercase tracking-wide text-gray-800 text-wrap'>{item.title}</span> */}
                    </div>
                    <div className='items-center w-auto'>
                    {openIndex === index ? (
                      <MinusCircleIcon className="h-5 w-5 text-red-600" />
                    ) : (
                      <PlusCircleIcon className="h-5 w-5 text-green-600" />
                    )}
                    </div>
                  </div>
                  {openIndex === index && (
                    <div className="bg-orange-100 px-6 py-4 shadow-inner">
                      <ul className="list-inside space-y-1">
                        {item.category.map((child) => (
                          <li key={child._id} className='flex items-center gap-4'>
                            <ArrowRightCircleIcon className='size-4'/>
                            <Link
                              to = {`/products/category?category=${child._id}`}
                              className="text-[16px] text-slate-900 hover:text-ellipsis hover:text-[17px] hover:font-medium hover:text-red-600"
                            >
                              {child.title}
                            </Link>
                            {/* <a
                              href={child.url}
                              className="text-[16px] text-slate-900 hover:text-ellipsis hover:text-[17px] hover:font-medium hover:text-red-600"
                            >
                              {child.title}
                            </a> */}
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
