import { authRoles } from "app/auth";
import i18next from "i18next";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";
import { ImUsers } from "react-icons/im";
import { IoHeartCircleOutline } from "react-icons/io5";
import { HiOutlineViewGridAdd } from "react-icons/hi";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import { FaUsers } from "react-icons/fa";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const isLoggedIn = !!localStorage.getItem("adminToken");

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    translate: "APPLICATIONS",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "dashboards",
        title: "Dashboards",
        translate: "DASHBOARDS",
        type: "collapse",
        icon: "dashboard",
        children: [
          {
            id: "analytics-dashboard",
            title: "Analytics",
            type: "item",
            url: "apps/dashboards/analytics",
          },
          {
            id: "project-dashboard",
            title: "Project",
            type: "item",
            url: "apps/dashboards/project",
          },
        ],
      },
      {
        id: "calendar",
        title: "Calendar",
        translate: "CALENDAR",
        type: "item",
        icon: "today",
        url: "apps/calendar",
      },
      {
        id: "1",
        title: "E-Commerce",
        translate: "ECOMMERCE",
        type: "collapse",
        icon: "shopping_cart",
        url: "apps/e-commerce",
        children: [
          {
            id: "e-commerce-products",
            title: "Products",
            type: "item",
            url: "apps/e-commerce/products",
            end: true,
          },
          // {
          //   id: "e-commerce-product-detail",
          //   title: "Product Detail",
          //   type: "item",
          //   url: "apps/e-commerce/products/details",
          // },
         
          // {
          //   id: "e-commerce-new-product",
          //   title: "New Product",
          //   type: "item",
          //   url: "apps/e-commerce/products/new",
          // },
          {
            id: "e-commerce-orders",
            title: "Orders",
            type: "item",
            url: "apps/e-commerce/orders",
            end: true,
          },
          // {
          //   id: "e-commerce-order-detail",
          //   title: "Order Detail",
          //   type: "item",
          //   url: "apps/e-commerce/orders/1",
          // },
        ],
      },
      {
        id: "icons",
        title: "Categories",
        type: "item",
        icon: <HiOutlineViewGridAdd />,
        url: "categories",
      },
      {
        id: "helper-classes",
        title: "Wishlist",
        type: "item",
        icon: <IoHeartCircleOutline />,
        url: "product/wishlist",
      },
      {
        id: "ui-typography",
        title: "Customer",
        type: "item",
        icon: <FaUsers />,
        url: "users",
      },
      {
        id: "user-interface",
        title: "User Interface",
        type: "group",
        icon: "web",
        children: [
          {
            id: "icons",
            title: "Admin User",
            type: "item",
            icon: <ImUsers />,
            url: "admin-user",
          },
         
          // {
          //   id: 'helper-classes',
          //   title: 'Wishlist',
          //   type: 'item',
          //   icon: 'help_outline',
          //   url: 'product/wishlist',
          // },
          // {
          //   id: "page-layouts",
          //   title: "Page Layouts",
          //   type: "collapse",
          //   icon: "view_quilt",
          //   children: [
          //     {
          //       id: "carded",
          //       title: "Carded",
          //       type: "collapse",
          //       badge: {
          //         title: 12,
          //         bg: "#525E8A",
          //         fg: "#FFFFFF",
          //       },
          //       children: [
          //         {
          //           id: "carded-full-width",
          //           title: "Full Width",
          //           type: "item",
          //           url: "ui/page-layouts/carded/full-width",
          //         },
          //         {
          //           id: "carded-full-width-tabbed",
          //           title: "Full Width Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/full-width-tabbed",
          //         },
          //         {
          //           id: "carded-full-width-2",
          //           title: "Full Width 2",
          //           type: "item",
          //           url: "ui/page-layouts/carded/full-width-2",
          //         },
          //         {
          //           id: "carded-full-width-2-tabbed",
          //           title: "Full Width 2 Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/full-width-2-tabbed",
          //         },
          //         {
          //           id: "carded-left-sidebar",
          //           title: "Left Sidebar",
          //           type: "item",
          //           url: "ui/page-layouts/carded/left-sidebar",
          //         },
          //         {
          //           id: "carded-left-sidebar-tabbed",
          //           title: "Left Sidebar Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/left-sidebar-tabbed",
          //         },
          //         {
          //           id: "carded-left-sidebar-2",
          //           title: "Left Sidebar 2",
          //           type: "item",
          //           url: "ui/page-layouts/carded/left-sidebar-2",
          //         },
          //         {
          //           id: "carded-left-sidebar-2-tabbed",
          //           title: "Left Sidebar 2 Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/left-sidebar-2-tabbed",
          //         },
          //         {
          //           id: "carded-right-sidebar",
          //           title: "Right Sidebar",
          //           type: "item",
          //           url: "ui/page-layouts/carded/right-sidebar",
          //         },
          //         {
          //           id: "carded-right-sidebar-tabbed",
          //           title: "Right Sidebar Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/right-sidebar-tabbed",
          //         },
          //         {
          //           id: "carded-right-sidebar-2",
          //           title: "Right Sidebar 2",
          //           type: "item",
          //           url: "ui/page-layouts/carded/right-sidebar-2",
          //         },
          //         {
          //           id: "carded-right-sidebar-2-tabbed",
          //           title: "Right Sidebar 2 Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/carded/right-sidebar-2-tabbed",
          //         },
          //       ],
          //     },
          //     {
          //       id: "simple",
          //       title: "Simple",
          //       type: "collapse",
          //       badge: {
          //         title: 8,
          //         bg: "#525E8A",
          //         fg: "#FFFFFF",
          //       },
          //       children: [
          //         {
          //           id: "simple-full-width",
          //           title: "Full Width",
          //           type: "item",
          //           url: "ui/page-layouts/simple/full-width",
          //         },
          //         {
          //           id: "simple-left-sidebar",
          //           title: "Left Sidebar",
          //           type: "item",
          //           url: "ui/page-layouts/simple/left-sidebar",
          //         },
          //         {
          //           id: "simple-left-sidebar-2",
          //           title: "Left Sidebar 2",
          //           type: "item",
          //           url: "ui/page-layouts/simple/left-sidebar-2",
          //         },
          //         {
          //           id: "simple-left-sidebar-3",
          //           title: "Left Sidebar 3",
          //           type: "item",
          //           url: "ui/page-layouts/simple/left-sidebar-3",
          //         },
          //         {
          //           id: "simple-right-sidebar",
          //           title: "Right Sidebar",
          //           type: "item",
          //           url: "ui/page-layouts/simple/right-sidebar",
          //         },
          //         {
          //           id: "simple-right-sidebar-2",
          //           title: "Right Sidebar 2",
          //           type: "item",
          //           url: "ui/page-layouts/simple/right-sidebar-2",
          //         },
          //         {
          //           id: "simple-right-sidebar-3",
          //           title: "Right Sidebar 3",
          //           type: "item",
          //           url: "ui/page-layouts/simple/right-sidebar-3",
          //         },
          //         {
          //           id: "simple-tabbed",
          //           title: "Tabbed",
          //           type: "item",
          //           url: "ui/page-layouts/simple/tabbed",
          //         },
          //       ],
          //     },
          //     {
          //       id: "blank",
          //       title: "Blank",
          //       type: "item",
          //       url: "ui/page-layouts/blank",
          //     },
          //   ],
          // },
        ],
      },
      // {
      //   id: "academy",
      //   title: "Academy",
      //   translate: "ACADEMY",
      //   type: "item",
      //   icon: "school",
      //   url: "apps/academy",
      // },
      // {
      //   id: "mail",
      //   title: "Mail",
      //   translate: "MAIL",
      //   type: "item",
      //   icon: "email",
      //   url: "apps/mail",
      //   badge: {
      //     title: 25,
      //     bg: "#F44336",
      //     fg: "#FFFFFF",
      //   },
      // },
      // {
      //   id: "todo",
      //   title: "To-Do",
      //   translate: "TODO",
      //   type: "item",
      //   icon: "check_box",
      //   url: "apps/todo",
      //   badge: {
      //     title: 3,
      //     bg: "rgb(255, 111, 0)",
      //     fg: "#FFFFFF",
      //   },
      // },
      // {
      //   id: "file-manager",
      //   title: "File Manager",
      //   translate: "FILE_MANAGER",
      //   type: "item",
      //   icon: "folder",
      //   url: "apps/file-manager",
      // },
      // {
      //   id: "contacts",
      //   title: "Contacts",
      //   translate: "CONTACTS",
      //   type: "item",
      //   icon: "account_box",
      //   url: "apps/contacts/all",
      // },
      // {
      //   id: "chat",
      //   title: "Chat",
      //   translate: "CHAT",
      //   type: "item",
      //   icon: "chat",
      //   url: "apps/chat",
      //   badge: {
      //     title: 13,
      //     bg: "rgb(9, 210, 97)",
      //     fg: "#FFFFFF",
      //   },
      // },
      // {
      //   id: "scrumboard",
      //   title: "Scrumboard",
      //   translate: "SCRUMBOARD",
      //   type: "item",
      //   icon: "assessment",
      //   url: "apps/scrumboard",
      // },
      // {
      //   id: "notes",
      //   title: "Notes",
      //   translate: "NOTES",
      //   type: "item",
      //   icon: "note",
      //   url: "apps/notes",
      // },
    ],
  },
  // {
  //   id: "pages",
  //   title: "Pages",
  //   type: "group",
  //   icon: "pages",
  //   children: [
  //     {
  //       id: "authentication",
  //       title: "Authentication",
  //       type: "collapse",
  //       icon: "lock",
  //       badge: {
  //         title: 10,
  //         bg: "#525E8A",
  //         fg: "#FFFFFF",
  //       },
  //       children: [
  //         {
  //           id: "authentication-login",
  //           title: "Login",
  //           type: "item",
  //           url: "pages/auth/login",
  //         },
  //         {
  //           id: "login-v2",
  //           title: "Login v2",
  //           type: "item",
  //           url: "pages/auth/login-2",
  //         },
  //         {
  //           id: "login-v3",
  //           title: "Login v3",
  //           type: "item",
  //           url: "pages/auth/login-3",
  //         },
  //         {
  //           id: "authentication-register",
  //           title: "Register",
  //           type: "item",
  //           url: "pages/auth/register",
  //         },
  //         {
  //           id: "authentication-register-v2",
  //           title: "Register v2",
  //           type: "item",
  //           url: "pages/auth/register-2",
  //         },
  //         {
  //           id: "authentication-register-v3",
  //           title: "Register v3",
  //           type: "item",
  //           url: "pages/auth/register-3",
  //         },
  //         {
  //           id: "authentication-forgot-password",
  //           title: "Forgot Password",
  //           type: "item",
  //           url: "pages/auth/forgot-password",
  //         },
  //         {
  //           id: "authentication-forgot-password-v2",
  //           title: "Forgot Password v2",
  //           type: "item",
  //           url: "pages/auth/forgot-password-2",
  //         },
  //         {
  //           id: "authentication-reset-password",
  //           title: "Reset Password",
  //           type: "item",
  //           url: "pages/auth/reset-password",
  //         },
  //         {
  //           id: "authentication-reset-password-v2",
  //           title: "Reset Password v2",
  //           type: "item",
  //           url: "pages/auth/reset-password-2",
  //         },
  //         {
  //           id: "authentication-lock-screen",
  //           title: "Lock Screen",
  //           type: "item",
  //           url: "pages/auth/lock",
  //         },
  //         {
  //           id: "authentication-mail-confirmation",
  //           title: "Mail Confirmation",
  //           type: "item",
  //           url: "pages/auth/mail-confirm",
  //         },
  //       ],
  //     },
  //     {
  //       id: "coming-soon",
  //       title: "Coming Soon",
  //       type: "item",
  //       icon: "alarm",
  //       url: "pages/coming-soon",
  //     },
  //     {
  //       id: "errors",
  //       title: "Errors",
  //       type: "collapse",
  //       icon: "info",
  //       children: [
  //         {
  //           id: "404",
  //           title: "404",
  //           type: "item",
  //           url: "pages/errors/error-404",
  //         },
  //         {
  //           id: "500",
  //           title: "500",
  //           type: "item",
  //           url: "pages/errors/error-500",
  //         },
  //       ],
  //     },
  //     {
  //       id: "invoice",
  //       title: "Invoice",
  //       type: "collapse",
  //       icon: "receipt",
  //       children: [
  //         {
  //           id: "modern",
  //           title: "Modern",
  //           type: "item",
  //           url: "pages/invoices/modern",
  //         },
  //         {
  //           id: "compact",
  //           title: "Compact",
  //           type: "item",
  //           url: "pages/invoices/compact",
  //         },
  //       ],
  //     },
  //     {
  //       id: "maintenance",
  //       title: "Maintenance",
  //       type: "item",
  //       icon: "build",
  //       url: "pages/maintenance",
  //     },
  //     {
  //       id: "pricing",
  //       title: "Pricing",
  //       type: "collapse",
  //       icon: "attach_money",
  //       children: [
  //         {
  //           id: "style-1",
  //           title: "Style 1",
  //           type: "item",
  //           url: "pages/pricing/style-1",
  //         },
  //         {
  //           id: "style-2",
  //           title: "Style 2",
  //           type: "item",
  //           url: "pages/pricing/style-2",
  //         },
  //         {
  //           id: "style-3",
  //           title: "Style 3",
  //           type: "item",
  //           url: "pages/pricing/style-3",
  //         },
  //       ],
  //     },
  //     {
  //       id: "profile",
  //       title: "Profile",
  //       type: "item",
  //       icon: "person",
  //       url: "pages/profile",
  //     },
  //     {
  //       id: "search",
  //       title: "Search",
  //       type: "collapse",
  //       icon: "search",
  //       children: [
  //         {
  //           id: "classic-search",
  //           title: "Classic Search",
  //           type: "item",
  //           url: "pages/search/classic",
  //         },
  //         {
  //           id: "modern-search",
  //           title: "Modern Search",
  //           type: "item",
  //           url: "pages/search/modern",
  //         },
  //       ],
  //     },
  //     {
  //       id: "faq",
  //       title: "Faq",
  //       type: "item",
  //       icon: "help_outline",
  //       url: "pages/faq",
  //     },
  //     {
  //       id: "knowledge-base",
  //       title: "Knowledge Base",
  //       type: "item",
  //       icon: "import_contacts",
  //       url: "pages/knowledge-base",
  //     },
    
  //   ],
  // },

  
 
  // DocumentationNavigation,
  {
    type: "divider",
    id: "divider-1",
  },
  {
    id: "auth",
    title: "Auth",
    type: "group",
    icon: "verified_user",
    children: [
      ...(!isLoggedIn
        ? [
            {
              id: "login",
              title: "Login",
              type: "item",
              url: "login",
              auth: authRoles.onlyGuest,
              icon: "lock",
            },
            {
              id: "register",
              title: "Register",
              type: "item",
              url: "register",
              auth: authRoles.onlyGuest,
              icon: "person_add",
            },
          ]
        : []),
      ...(isLoggedIn
        ? [
            {
              id: "logout",
              title: "Logout",
              type: "item",
              auth: authRoles.user,
              url: "/login",
              icon: "exit_to_app",
            },
          ]
        : []),
     
    ],
  },
 
];

export default navigationConfig;
