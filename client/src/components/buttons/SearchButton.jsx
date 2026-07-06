"use client";

import React from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import SearchBar from "../ui/SearchBar";

const SearchButton = () => {
  return (
    <div className="h-auto pr-2 w-auto">
      <Menu>
        <MenuButton>
          <MagnifyingGlassIcon
            className="w-6 h-6 text-white" // Điều chỉnh kích thước biểu tượng
          />
        </MenuButton>
        <MenuItems>
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-full z-50 bg-red-600 shadow-lg rounded-b-lg" // Thêm bo góc cho thanh tìm kiếm
          >
            <SearchBar variant="mobile" />
          </motion.div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default SearchButton;
