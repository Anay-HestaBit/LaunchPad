"use client";

import Image from "next/image";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";

/* Navigation data */
const MAIN_NAV = [
  { name: "Dashboard", path: "/dashboard", icon: "/icons/dashboard.png" },
  { name: "Tables", path: "/dashboard/tables", icon: "/icons/tables.png" },
  { name: "Billing", path: "/dashboard/billing", icon: "/icons/billing.png" },
  { name: "RTL", path: "/dashboard/rtl", icon: "/icons/RTL.png" },
];

const ACCOUNT_NAV = [
  { name: "Profile", path: "/dashboard/profile", icon: "/icons/profile.png" },
  { name: "Sign In", path: "/login", icon: "/icons/signin.png" },
  { name: "Sign Up", path: "/register", icon: "/icons/signup.png" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r px-6 py-4 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="/icons/logo.png"
          alt="Logo"
          width={20}
          height={20}
        />
        <span className="text-xs font-semibold text-gray-800">
          PURITY UI DASHBOARD
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <ul className="space-y-2">
          {MAIN_NAV.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              active={pathname === item.path}
            />
          ))}
        </ul>

        <p className="text-xs font-semibold text-gray-400 mt-6 mb-2">
          ACCOUNT PAGES
        </p>

        <ul className="space-y-2">
          {ACCOUNT_NAV.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              active={pathname === item.path}
            />
          ))}
        </ul>
      </div>
      <div className="bg-teal-400 rounded-xl p-4 text-white mt-6">
        <HelpCircle size={20} />
        <p className="mt-2 font-semibold">Need help?</p>
        <p className="text-sm opacity-90">
          Please check our docs
        </p>
        <button className="mt-4 bg-white text-teal-500 w-full py-2 rounded-lg text-sm font-semibold">
          DOCUMENTATION
        </button>
      </div>
    </aside>
  );
}

/* Single Nav Item */
function NavItem({ item, active }) {
  return (
    <Link href={item.path}>
      <li
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
          ${
            active
              ? "bg-gray-100 text-gray-900 font-semibold"
              : "text-gray-500 hover:text-gray-900"
          }
        `}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center
            ${active ? "bg-black-400" : "bg-gray-100"}
          `}
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={16}
            height={16}
          />
        </div>

        <span className="text-sm">{item.name}</span>
      </li>
    </Link>
  );
}
