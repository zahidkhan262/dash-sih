import { FaHome, FaUser, FaMoneyBill } from "react-icons/fa";
import { AiTwotoneFileExclamation } from "react-icons/ai";

export const routes = [
    {
        path: '/',
        name: "Dashboard",
        icon: FaHome,
    },
    {
        path: '/alumni',
        name: "Alumni",
        icon: FaUser,
    },
    {
        path: '/users',
        name: "Users",
        icon: FaUser,
    },

    {
        path: '/more',
        name: "More",
        icon: FaUser,
        subRoutes: [
            {
                path: '/blog',
                name: "Blog",
                icon: FaMoneyBill,
                subMenus: [
                    {
                        path: '/blogs',
                        name: "User Blogs",
                        icon: FaUser,
                    },

                ],
            },
            {
                path: "/home-banner",
                name: "Home Banner",
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

export const notificationData = [
    {
        id: 1,
        title: 'Roman Joined the team',
        subTitle: 'Congratultion',
        icon: 'https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg'
    },
    {
        id: 2,
        title: 'Priyanshay Joined the team',
        subTitle: 'Congratultion',
        icon: 'https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg'
    },
    {
        id: 3,
        title: 'Shruti Joined the team',
        subTitle: 'Congratultion',
        icon: 'https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg'
    },

]

export const chartData = [
    {
        id: 1,
        label: 'Alumni',
        value: 300
    },
    {
        id: 2,
        label: 'Students',
        value: 100
    },
    {
        id: 3,
        label: 'Jobs',
        value: 80
    },
]
