import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useActiveRouteName from '../../utils/useCurrentPathName';
import { navMenu, routes } from '../../utils/data';
import { FaBars, FaBell, FaMailBulk, FaMoon, FaRing, FaSearch, FaSun, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context';
import NotificationCard from '../../components/cards/notification-card';
import ProfileCard from '../../components/cards/profile-card';
import { motion } from "framer-motion";

const Header = () => {
    const activePath = useActiveRouteName(routes);
    const { isActive, handleToggleBar, handleToggleNotification, isNotification, isProfile, handleToggleProfile } = useAuth();

    return (
        <>
            <motion.header
                animate={{
                    width: isActive ? "" : "topbar-active",
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        damping: 10,
                    },
                }}
                className={`topbar ${isActive ? '' : 'topbar-active'}`}
            >
                <div className="with-vertical">
                    <nav className="navbar navbar-expand-lg w-full p-0 d-flex justify-content-between align-items-center">

                        <ul className="navbar-nav quick-links  d-lg-flex align-items-center">
                            <li className="nav-item nav-icon-hover-bg rounded-circle ms-n2" >
                                <a className="nav-link sidebartoggler" id="headerCollapse" >
                                    <FaBars onClick={handleToggleBar} />
                                </a>
                            </li>
                            <li className="nav-item nav-icon-hover-bg rounded-circle  d-lg-flex">
                                <a className="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <FaSearch />
                                </a>
                            </li>
                            {
                                navMenu?.length && navMenu?.map((menu) => (
                                    <li key={menu?.id} className="nav-item dropdown-hover  d-lg-block">
                                        <Link className="nav-link" to={menu?.path}>{menu?.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="navbar-nav quick-links  d-flex align-items-center">
                            <li className="nav-item nav-icon-hover-bg rounded-circle dropdown" onClick={handleToggleNotification}>
                                <a className="nav-link position-relative" id="drop2" aria-expanded="false">
                                    <FaBell />
                                    <div className="notification bg-primary rounded-circle" />
                                </a>
                                {
                                    isNotification ?
                                        <NotificationCard />
                                        : ''
                                }
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link pe-0" id="drop1" aria-expanded="false">
                                    <div className="d-flex align-items-center">
                                        <div className="user-profile-img" onClick={handleToggleProfile}>
                                            <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width={35} height={35} alt="modernize-img" />
                                        </div>
                                    </div>
                                </a>
                                {
                                    isProfile ?
                                        <ProfileCard />
                                        : ''
                                }
                            </li>
                        </ul>
                    </nav>

                </div>
            </motion.header>
        </>

    )
}

export default Header