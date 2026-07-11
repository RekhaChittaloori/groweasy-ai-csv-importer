"use client";

import {
  LayoutDashboard,
  Users,
  Upload,
  Database,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg border-r min-h-screen">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-green-600">
          GrowEasy AI
        </h1>

        <p className="text-sm text-gray-500">
          CRM Importer
        </p>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          title="Dashboard"
        />

        <SidebarItem
          icon={<Users size={20} />}
          title="Manage Leads"
        />

        <SidebarItem
          icon={<Upload size={20} />}
          title="Import CSV"
          active
        />

        <SidebarItem
          icon={<Database size={20} />}
          title="Lead Sources"
        />

        <SidebarItem
          icon={<Settings size={20} />}
          title="Settings"
        />
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  title,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
        active
          ? "bg-green-100 text-green-700 font-semibold"
          : "hover:bg-gray-100"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}