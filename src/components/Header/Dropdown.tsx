"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WPMenuItem } from "@/types/menu"; // Import Type chuẩn

const Dropdown = ({
  menuItem,
  stickyMenu,
}: {
  menuItem: WPMenuItem;
  stickyMenu: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathUrl = usePathname();

  // Xử lý đóng mở trên mobile khi click vào mũi tên/link cha
  const handleDropdownToggle = (e: React.MouseEvent) => {
    if (window.innerWidth < 1280) { // Breakpoint XL
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <li
      className="group relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <Link
        href={menuItem.path || "#"}
        onClick={handleDropdownToggle}
        className={`flex items-center gap-1 hover:text-blue text-custom-sm font-medium text-dark ${
          stickyMenu ? "xl:py-4" : "xl:py-6"
        } ${pathUrl === menuItem.path ? "text-blue" : ""}`}
      >
        {menuItem.label}
        <svg
          className={`fill-current cursor-pointer duration-200 ease-in ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.00016 0.666664L9.16683 4.83333L0.833496 4.83333L5.00016 0.666664Z"
            transform="translate(10 6) rotate(180)"
          />
        </svg>
      </Link>

      {/* Dropdown Menu Box */}
      <div
        className={`submenu relative left-0 top-full w-[250px] rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 xl:invisible xl:absolute xl:opacity-0 xl:shadow-md xl:group-hover:visible xl:group-hover:top-full ${
          dropdownOpen ? "!visible !opacity-100 top-full" : ""
        }`}
      >
        <div className="bg-white p-3 border border-gray-3 rounded-md shadow-lg">
            <ul className="flex flex-col gap-2">
            
            {/* 👇 SỬA LỖI TẠI ĐÂY: Thay menuItem.submenu bằng menuItem.childItems.nodes */}
            {menuItem.childItems?.nodes?.map((submenuItem, index) => (
                <li key={submenuItem.id || index}>
                <Link
                    href={submenuItem.path}
                    className={`block rounded py-2 px-3 text-sm font-medium text-dark hover:text-blue hover:bg-gray-50 ${
                    pathUrl === submenuItem.path ? "text-blue bg-gray-50" : ""
                    }`}
                >
                    {submenuItem.label}
                </Link>
                </li>
            ))}

            </ul>
        </div>
      </div>
    </li>
  );
};

export default Dropdown;