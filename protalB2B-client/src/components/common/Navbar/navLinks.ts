import type { Role } from "../../../features/auth/types/userTypes";

export interface NavLinkItem {
  to: string;
  label: string;
}

// {Guest Links}
export const guestLinks: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
];

// {Auth Links}
const commonAuthLinks: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/user/change-password", label: "Change Password" }, // 👈 tu
];

// {Roles Lins}
const roleSpecificLinks: Record<Role, NavLinkItem[]> = {
  employee: [],
  distributor: [{ to: "/reports", label: "Sales Reports" }],
  manager: [
    { to: "/reports", label: "Sales Reports" },
    { to: "/targets", label: "Targets" },
  ],
  admin: [
    { to: "/reports", label: "Sales Reports" },
    { to: "/admin/dashboard", label: "Admin Dashboard" },
  ],
  superadmin: [
    { to: "/reports", label: "Sales Reports" },
    { to: "/admin/dashboard", label: "Admin Dashboard" },
    { to: "/superadmin/add-user", label: "Add User" },
    { to: "/logs", label: "Logs" },
  ],
};

export function getNavLinksForRole(role?: Role): NavLinkItem[] {
  if (!role) return guestLinks;
  return [...commonAuthLinks, ...roleSpecificLinks[role]];
}
