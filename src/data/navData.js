import { UserRole } from "../lib/roles";

export const userMenuLinks = [
    {
        name: "Admin Dashboard",
        path: "/admin/dashboard",
        roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    },
    {
        name:"My Inquiries",
        path:"/my-inquiries",
        roles: [UserRole.USER],
    },
    {
        name: "Profile",
        path: "/my-profile",
        roles: [UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN],
    }
];
