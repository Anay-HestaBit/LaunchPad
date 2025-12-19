"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/* Convert route to readable title */
function getTitleFromPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  // examples:
  // /dashboard           → ["dashboard"]
  // /dashboard/tables    → ["dashboard", "tables"]

  if (parts.length === 1) return "Dashboard";

  const last = parts[parts.length - 1];

  // Capitalize first letter
  return last.charAt(0).toUpperCase() + last.slice(1);
}

export default function Navbar() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      
      {/* LEFT */}
      <div>
        <p className="text-xs text-gray-400">
          Pages / <span className="text-gray-600">{title}</span>
        </p>
        <h1 className="text-sm font-semibold text-gray-800">
          {title}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg gap-2 text-black">
          <Image src="/icons/search.png" alt="search" width={14} height={14} />
          <input
            type="text"
            placeholder="Type here..."
            className="bg-transparent outline-none text-sm w-32"
          />
        </div>

        {/* Sign In */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Image src="/icons/user.png" alt="user" width={16} height={16} />
          <span className="text-sm text-gray-600">Sign In</span>
        </div>

        <Image
          src="/icons/settings.png"
          alt="settings"
          width={18}
          height={18}
          className="cursor-pointer"
        />

        <Image
          src="/icons/notification.png"
          alt="notification"
          width={18}
          height={18}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
