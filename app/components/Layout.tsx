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
  pages: [
    { name: "Accessories", href: "/accessories" },
    { name: "Products", href: "/products" },
  ],
};

export function Layout() {
  return (
    <>
    <header className="relative z-10">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-orange-900">
          <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            {/* Currency selector */}
            <div className="flex-1 flex items-center">
                  <Link to="/homepage">
                    <span className="sr-only">Workflow</span>
                    <img className="h-8 w-auto" src={serenuplogo} alt="" />
                  </Link>
                </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/registration"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary navigation */}


      </nav>
    </header>
    <body>
        
        <Outlet/>
    </body>
    </>
  );
}
