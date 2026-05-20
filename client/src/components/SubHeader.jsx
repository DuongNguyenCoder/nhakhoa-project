import React, { useEffect, useState } from "react";
import { apiGetMethod } from "@/apis/methodAPI";

const SubHeader = () => {
  const [methods, setMethod] = useState([]);

  useEffect(() => {
    const fetchMethods = async () => {
      await apiGetMethod()
        .then((rs) => {
          console.log("aaa: ", rs);
          console.log("aa: ", rs.data);
          if (rs.data && rs.data.success) {
            setMethod(rs.data.data.slice(0, 4));
          } else console.error("Lỗi API get method");
        })
        .catch((err) => {
          console.log("Lỗi: ", err);
        });
    };
    fetchMethods();
  }, []);
  console.log("method: ", methods);

  if (!methods) {
    return null;
  }

  const icons = [
    "/assets/icon-shipping.png",
    "/assets/icon-pay.png",
    "/assets/icon-support.png",
    "/assets/icon-warranty.png",
  ];

  return (
    <div className="h-50% hidden w-full md:block">
      <div className="flex h-full w-full items-start justify-between gap-x-2 px-4 py-3 lg:gap-x-3 lg:px-6">
        {methods.map((method, index) => (
          <div key={method._id} className="flex-col px-2">
            <p className="flex items-center gap-x-1 text-[12px] font-semibold lg:text-[13px] lg:font-bold xl:text-[15px]">
              <img src={icons[index]} alt="icon" className="size-7 lg:size-8" />
              {method.title}
            </p>
            <ul className="mb-2 ml-5 list-disc pl-4 text-[12px] marker:text-sky-500 lg:text-[13px] xl:text-[14px]">
              {method.description?.split("\n").map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHeader;
