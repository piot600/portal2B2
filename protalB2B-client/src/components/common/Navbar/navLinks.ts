// src/components/layout/Navbar/navLinks.ts
import type { Role } from "../../../features/auth/types/userTypes";

export interface NavLinkItem {
  to: string;
  label: string;
}

// 🔹 Gość (niezalogowany)
export const guestLinks: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
];

// 🔹 Wspólne linki dla zalogowanych
const commonAuthLinks: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/user/change-password", label: "Change Password" },
];

// 🔹 Linki specyficzne dla ról
const roleSpecificLinks: Record<Role, NavLinkItem[]> = {
  employee: [{ to: "/media", label: "Media" }],
  distributor: [
    { to: "/sales-channels/add", label: "Add Report" },
    { to: "/sales-reports", label: "My Reports" },
  ],
  manager: [{ to: "/sales-reports", label: "Distributor Reports" }],
  admin: [{ to: "/sales-reports", label: "All Reports" }],
  superadmin: [
    { to: "/sales-reports", label: "All Reports" },
    { to: "/superadmin/add-user", label: "Add User" },
    { to: "/logs", label: "Logs" },
  ],
};

// 🔹 Główna funkcja zwracająca linki dla danej roli
export function getNavLinksForRole(role?: Role): NavLinkItem[] {
  if (!role) return guestLinks;
  return [...commonAuthLinks, ...(roleSpecificLinks[role] || [])];
}
