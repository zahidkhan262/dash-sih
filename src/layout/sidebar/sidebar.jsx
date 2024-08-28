import { NavLink } from "react-router-dom";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./sidebarmenu";
import { routes } from "../../utils/data";
import { showAnimation } from "../../utils/animate";

const SideBar = ({ children, setIsOpen, isOpen, isActive }) => {


    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isActive ? "300px" : "80px",
                        transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 10,
                        },
                    }}
                    className="sidebar"
                >
                    <div className="logo">Dashboard</div>

                    <section className="routes">
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        key={index}
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                    />
                                );
                            }

                            return (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className="link sidebar-menu"
                                    activeclassname="active"
                                >
                                    <div className="menu-icon">{<route.icon />}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text sidebar-menu"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            );
                        })}
                    </section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    );
};

export default SideBar;
