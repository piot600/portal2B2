import type { Role } from "../../../features/auth/types/userTypes";

export interface NavSubLink {
  to: string;
  label: string;
}

export interface NavCategory {
  label: string;
  links: NavSubLink[];
}

export type NavMenu = NavCategory[];

export const guestMenu: NavMenu = [
  {
    label: "General",
    links: [
      { to: "/", label: "Home" },
      { to: "/login", label: "Login" },
    ],
  },
];

const commonAuthMenu: NavMenu = [
  {
    label: "General",
    links: [{ to: "/", label: "Home" }],
  },
];

const roleSpecificMenus: Record<Role, NavMenu> = {
  employee: [
    {
      label: "Media",
      links: [{ to: "/media", label: "Media Library" }],
    },
  ],

  distributor: [
    {
      label: "Sales Channels",
      links: [
        { to: "/sales-channels/add", label: "Add Sales Report" },
        { to: "/sales-reports", label: "My Sales Reports" },
      ],
    },
    {
      label: "Purchase Reports",
      links: [{ to: "/purchase-reports", label: "My Purchase Reports" }],
    },
    {
      label: "Team",
      links: [{ to: "/my-employees", label: "My Employees" }],
    },
  ],

  manager: [
    {
      label: "Sales Channels",
      links: [{ to: "/sales-reports", label: "Distributor Sales Reports" }],
    },
    {
      label: "Purchase Reports",
      links: [
        { to: "/purchase-reports", label: "Distributor Purchase Reports" },
        { to: "/purchase-reports/add", label: "Add Purchase Report" },
      ],
    },
    {
      label: "Distributors",
      links: [{ to: "/my-distributors", label: "My Distributors" }],
    },
  ],

  admin: [
    {
      label: "Reports",
      links: [
        { to: "/sales-reports", label: "All Sales Reports" },
        { to: "/purchase-reports", label: "All Purchase Reports" },
      ],
    },
    {
      label: "Users",
      links: [{ to: "/all-users", label: "All Users" }],
    },
  ],

  superadmin: [
    {
      label: "Reports",
      links: [
        { to: "/sales-reports", label: "All Sales Reports" },
        { to: "/purchase-reports", label: "All Purchase Reports" },
      ],
    },
    {
      label: "Management",
      links: [
        { to: "/all-users", label: "All Users" },
        { to: "/superadmin/add-user", label: "Add User" },
        { to: "/logs", label: "Logs" },
      ],
    },
  ],
};

export function getNavMenuForRole(role?: Role): NavMenu {
  if (!role) return guestMenu;
  return [...commonAuthMenu, ...(roleSpecificMenus[role] || [])];
}
