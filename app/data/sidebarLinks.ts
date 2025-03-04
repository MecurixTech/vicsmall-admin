import {
  DashboardOutlined,
  Inventory2Outlined,
  LogoutOutlined,
  PersonOutlined,
  ShoppingBagOutlined,
  Storefront,
  SupervisorAccount,
  LocalShipping,
  Reviews,
  Wallet,
} from "@mui/icons-material";


export const sidebarLinks = [
  {
    id: 0,
    label: "Dashboard",
    href: "/",
    icon: DashboardOutlined,
  },
  {
    id: 1,
    label: "Products",
    href: "/products",
    icon: Inventory2Outlined,
  },
  {
    id: 2,
    label: "Orders",
    href: "/orders",
    icon: ShoppingBagOutlined,
  },
  {
    id: 4,
    label: "Vendors",
    href: "/vendors",
    icon: Storefront,
  },
  {
    id: 5,
    label: "Admins",
    href: "/admin",
    icon: SupervisorAccount,
  },
  {
    id: 6,
    label: "Shipping",
    href: "/shipping-zone",
    icon: LocalShipping,
  },
  {
    id: 7,
    label: "Reviews",
    href: "/reviews",
    icon:   Reviews,
  },
  {
    id: 8,
    label: "Payment Method",
    href: "/payment-method",
    icon:   Wallet,
  },
  {
    id: 4,
    label: "Profile",
    href: "/profile",
    icon: PersonOutlined,
  },
  {
    id: 5,
    label: "Logout",
    href: "/logout",
    icon: LogoutOutlined,
  },
];

export default sidebarLinks;
