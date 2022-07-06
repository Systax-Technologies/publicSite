import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import serenuplogo from "public/assets/seren-up-logo.png";
import { Outlet } from "@remix-run/react";

const navigation = {
  pages: [{ name: "Products", href: "/products" }],
};

export function Layout() {
  return (
    <>
      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className=" bg-sky-900">
            <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              <div className="w-screen flex items-center space-x-6 h-16 justify-between">
                <div className="hidden lg:flex-1 lg:flex lg:items-center ">
                  <a href="/homepage">
                    <span className="sr-only">Workflow</span>
                    <img className="h-8 w-auto" src={serenuplogo} alt="" />
                  </a>{" "}
                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="px-4 bottom-0 inset-x-0">
                      <div className="h-full flex justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-white"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>
                </div>
                <div className="ml-4 flow-root lg:ml-8">
                  <Link
                    to={"/orders/cart"}
                    className="group -m-2 p-2 flex items-center"
                  >
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-white">
                      2
                      {/* here it will be displayed the number of products saved in the current session */}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
                <Link
                  to="/signin"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="backdrop-blur-md backdrop-filter bg-opacity-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div>
                <div className="">
                  {/* Logo (lg+) */}

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex-1 flex items-center lg:hidden">

                    {/* Search */}
                    <a href="#" className="ml-2 p-2 text-white">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="/homepage" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    <img src={serenuplogo} alt="" className="h-8 w-auto" />
                  </a>

                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center lg:ml-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <body>
        <Outlet />
      </body>
    </>
  );
}
