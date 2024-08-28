import { FaHome, FaUser, FaMoneyBill } from "react-icons/fa";
import { AiTwotoneFileExclamation } from "react-icons/ai";

export const routes = [
    {
        path: '/home',
        name: "Home",
        icon: FaHome,
    },
  
    {
        path: '/cms',
        name: "Users",
        icon: FaUser,
        subRoutes: [
            {
                path: '/blog',
                name: "Blog",
                icon: FaMoneyBill,
                subMenus: [
                    {
                        path: '/blogs',
                        name: "Blogs",
                        icon: FaUser,
                    },
                    
                    {
                        path: '/author',
                        name: "Author",
                        icon: FaUser,
                    },
                ],
            },
            {
                path: "/home-banner",
                name: "Home Banner",
                icon: FaUser,
            },
            
            {
                path: "/contact-location",
                name: "Contact Location",
                icon: FaUser,
            },
            {
                path: "/leads",
                name: "Leads",
                icon: FaUser,
            },
        ],
    },
    {
        path: "/settings",
        name: "Setting",
        icon: FaUser,
    },
];

export const navMenu = [
    {
        id: 1,
        path: '/app-page',
        name: 'App'
    },
    {
        id: 2,
        path: '/chat-page',
        name: 'Chat'
    },
    {
        id: 3,
        path: '/email-page',
        name: 'Email'
    },
]
