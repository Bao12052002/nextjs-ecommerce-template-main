"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Sidebar from "./Sidebar";
import SingleGridItem from "./SingleGridItem";
import SingleListItem from "./SingleListItem";
import CustomSelect from "./CustomSelect";
import { ProductNode, ProductCategoryNode } from "@/types/product";

interface ShopProps {
  initialProducts: ProductNode[];
  categories: ProductCategoryNode[];
  title?: string;
}

const Shop = ({
  initialProducts = [],
  categories = [],
  title = "Explore All Products",
}: ShopProps) => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  // --- CONFIG PAGINATION ---
  const itemsPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(1);

  // --- STATE DỮ LIỆU ---
  const [filteredProducts, setFilteredProducts] = useState<ProductNode[]>(initialProducts);

  useEffect(() => {
    setFilteredProducts(initialProducts);
    setCurrentPage(1); 
  }, [initialProducts]);

  // --- LOGIC SẮP XẾP ---
  const handleSortChange = (value: string) => {
    let sorted = [...filteredProducts];
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => {
          const pA = parseFloat(a.price?.replace(/[^0-9]/g, "") || "0");
          const pB = parseFloat(b.price?.replace(/[^0-9]/g, "") || "0");
          return pA - pB;
        });
        break;
      case "price-desc":
        sorted.sort((a, b) => {
          const pA = parseFloat(a.price?.replace(/[^0-9]/g, "") || "0");
          const pB = parseFloat(b.price?.replace(/[^0-9]/g, "") || "0");
          return pB - pA;
        });
        break;
      case "latest":
      default:
        sorted = [...initialProducts]; 
        break;
    }
    setFilteredProducts(sorted);
    setCurrentPage(1); 
  };

  // --- LOGIC PHÂN TRANG ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // --- LOGIC GIAO DIỆN ---
  useEffect(() => {
    const handleStickyMenu = () => {
      if (window.scrollY >= 80) setStickyMenu(true);
      else setStickyMenu(false);
    };

    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".sidebar-content") && !event.target.closest("#sidebar-toggle")) {
        setProductSidebar(false);
      }
    };

    window.addEventListener("scroll", handleStickyMenu);
    if (productSidebar) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  const sortOptions = [
    { label: "Latest Products", value: "latest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  return (
    <>
  
      
      <section className="relative pb-20 pt-5 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            
            {/* Sidebar Mobile & Desktop */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto shadow-lg"
                  : "-translate-x-full"
              }`}
            >
              <button
                id="sidebar-toggle"
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu
                    ? "lg:top-20 sm:top-34.5 top-35"
                    : "lg:top-24 sm:top-39 top-37"
                }`}
              >
                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0068 3.44714C10.3121 3.72703 10.3328 4.20146 10.0529 4.5068L5.70494 9.25H20C20.4142 9.25 20.75 9.58579 20.75 10C20.75 10.4142 20.4142 10.75 20 10.75H4.00002C3.70259 10.75 3.43327 10.5742 3.3135 10.302C3.19374 10.0298 3.24617 9.71246 3.44715 9.49321L8.94715 3.49321C9.22704 3.18787 9.70147 3.16724 10.0068 3.44714Z" fill="" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.6865 13.698C20.5668 13.4258 20.2974 13.25 20 13.25L4.00001 13.25C3.5858 13.25 3.25001 13.5858 3.25001 14C3.25001 14.4142 3.5858 14.75 4.00001 14.75L18.2951 14.75L13.9472 19.4932C13.6673 19.7985 13.6879 20.273 13.9932 20.5529C14.2986 20.8328 14.773 20.8121 15.0529 20.5068L20.5529 14.5068C20.7539 14.2876 20.8063 13.9703 20.6865 13.698Z" fill="" />
                </svg>
              </button>

              <Sidebar categories={categories} closeSidebar={() => setProductSidebar(false)} />
            </div>

            {/* Main Content */}
            <div className="xl:max-w-[870px] w-full">
              
              {/* Filter Bar */}
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={sortOptions} onChange={handleSortChange} />
                    <p>
                      Showing <span className="text-dark">
                        {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0} 
                        - 
                        {Math.min(indexOfLastItem, filteredProducts.length)}
                      </span> of <span className="text-dark">{filteredProducts.length}</span> Products
                    </p>
                  </div>

                   <div className="flex items-center gap-2.5">
                    <button onClick={() => setProductStyle("grid")} className={`${productStyle === "grid" ? "bg-blue border-blue text-white" : "text-dark bg-gray-1 border-gray-3"} flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}>
                      <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4.836 1.3125C4.16215 1.31248 3.60022 1.31246 3.15414 1.37244C2.6833 1.43574 2.2582 1.57499 1.91659 1.91659C1.57499 2.2582 1.43574 2.6833 1.37244 3.15414C1.31246 3.60022 1.31248 4.16213 1.3125 4.83598V4.914C1.31248 5.58785 1.31246 6.14978 1.37244 6.59586C1.43574 7.06671 1.57499 7.49181 1.91659 7.83341C2.2582 8.17501 2.6833 8.31427 3.15414 8.37757C3.60022 8.43754 4.16213 8.43752 4.83598 8.4375H4.914C5.58785 8.43752 6.14978 8.43754 6.59586 8.37757C7.06671 8.31427 7.49181 8.17501 7.83341 7.83341C8.17501 7.49181 8.31427 7.06671 8.37757 6.59586C8.43754 6.14978 8.43752 5.58787 8.4375 4.91402V4.83601C8.43752 4.16216 8.43754 3.60022 8.37757 3.15414C8.31427 2.6833 8.17501 2.2582 7.83341 1.91659C7.49181 1.57499 7.06671 1.43574 6.59586 1.37244C6.14978 1.31246 5.58787 1.31248 4.91402 1.3125H4.836ZM13.086 1.3125C12.4122 1.31248 11.8502 1.31246 11.4041 1.37244C10.9333 1.43574 10.5082 1.57499 10.1666 1.91659C9.82499 2.2582 9.68574 2.6833 9.62244 3.15414C9.56246 3.60023 9.56248 4.16214 9.5625 4.836V4.914C9.56248 5.58786 9.56246 6.14978 9.62244 6.59586C9.68574 7.06671 9.82499 7.49181 10.1666 7.83341C10.5082 8.17501 10.9333 8.31427 11.4041 8.37757C11.8502 8.43754 12.4121 8.43752 13.086 8.4375H13.164C13.8378 8.43752 14.3998 8.43754 14.8459 8.37757C15.3167 8.31427 15.7418 8.17501 16.0834 7.83341C16.425 7.49181 16.5643 7.06671 16.6276 6.59586C16.6875 6.14978 16.6875 5.58787 16.6875 4.91402V4.83601C16.6875 4.16216 16.6875 3.60022 16.6276 3.15414C16.5643 2.6833 16.425 2.2582 16.0834 1.91659C15.7418 1.57499 15.3167 1.43574 14.8459 1.37244C14.3998 1.31246 13.8379 1.31248 13.164 1.3125H13.086ZM4.836 9.5625H4.914C5.58786 9.56248 6.14978 9.56246 6.59586 9.62244C7.06671 9.68574 7.49181 9.82499 7.83341 10.1666C8.17501 10.5082 8.31427 10.9333 8.37757 11.4041C8.43754 11.8502 8.43752 12.4121 8.4375 13.086V13.164C8.43752 13.8378 8.43754 14.3998 8.37757 14.8459C8.31427 15.3167 8.17501 15.7418 7.83341 16.0834C7.49181 16.425 7.06671 16.5643 6.59586 16.6276C6.14979 16.6875 5.58789 16.6875 4.91405 16.6875H4.83601C4.16217 16.6875 3.60022 16.6875 3.15414 16.6276C2.6833 16.5643 2.2582 16.425 1.91659 16.0834C1.57499 15.7418 1.43574 15.3167 1.37244 14.8459C1.31246 14.3998 1.31248 13.8379 1.3125 13.164V13.086C1.31248 12.4122 1.31246 11.8502 1.37244 11.4041C1.43574 10.9333 1.57499 10.5082 1.91659 10.1666C2.2582 9.82499 2.6833 9.68574 3.15414 9.62244C3.60023 9.56246 4.16214 9.56248 4.836 9.5625ZM13.086 9.5625C12.4121 9.56248 11.8502 9.56246 11.4041 9.62244C10.9333 9.68574 10.5082 9.82499 10.1666 10.1666C9.82499 10.5082 9.68574 10.9333 9.62244 11.4041C9.56246 11.8502 9.56248 12.4121 9.5625 13.086V13.164C9.56248 13.8379 9.56246 14.3998 9.62244 14.8459C9.68574 15.3167 9.82499 15.7418 10.1666 16.0834C10.5082 16.425 10.9333 16.5643 11.4041 16.6276C11.8502 16.6875 12.4121 16.6875 13.0859 16.6875H13.164C13.8378 16.6875 14.3998 16.6875 14.8459 16.6276C15.3167 16.5643 15.7418 16.425 16.0834 16.0834C16.425 15.7418 16.5643 15.3167 16.6276 14.8459C16.6875 14.3998 16.6875 13.8379 16.6875 13.1641V13.086C16.6875 12.4122 16.6875 11.8502 16.6276 11.4041C16.5643 10.9333 16.425 10.5082 16.0834 10.1666C15.7418 9.82499 15.3167 9.68574 14.8459 9.62244C14.3998 9.56246 13.8379 9.56248 13.164 9.5625H13.086Z" fill="" /></svg>
                    </button>
                   </div>
                </div>
              </div>

              {/* Grid Sản Phẩm */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((item, key) =>
                    productStyle === "grid" ? (
                      <SingleGridItem key={key} product={item} />
                    ) : (
                      <SingleListItem key={key} product={item} />
                    )
                  )
                ) : (
                  <div className="col-span-full py-10 text-center text-gray-500 bg-white shadow-1 rounded-lg">
                    No products found in this category.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-15">
                  <div className="bg-white shadow-1 rounded-md p-2">
                    <ul className="flex items-center">
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] disabled:text-gray-4 hover:text-white hover:bg-blue disabled:hover:bg-transparent"
                        >
                          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z" fill="" /></svg>
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, idx) => {
                        const page = idx + 1;
                        return (
                          <li key={page}>
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] ${
                                currentPage === page
                                  ? "bg-blue text-white"
                                  : "text-dark hover:text-white hover:bg-blue"
                              }`}
                            >
                              {page}
                            </button>
                          </li>
                        );
                      })}
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] disabled:text-gray-4 hover:text-white hover:bg-blue disabled:hover:bg-transparent"
                        >
                          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z" fill="" /></svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;