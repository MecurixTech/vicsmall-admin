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
    id: 3,
    label: "Vendors",
    href: "/vendors",
    icon: Storefront,
  },
  {
    id: 4,
    label: "Admins",
    href: "/admin",
    icon: SupervisorAccount,
  },
  {
    id: 5,
    label: "Shipping",
    href: "/shipping-zone",
    icon: LocalShipping,
  },
  {
    id: 6,
    label: "Reviews",
    href: "/reviews",
    icon: Reviews,
  },
  {
    id: 7,
    label: "Payment Method",
    href: "/payment-method",
    icon: Wallet,
  },
  {
    id: 8,
    label: "Profile",
    href: "/profile",
    icon: PersonOutlined,
  },
];

export default sidebarLinks;
