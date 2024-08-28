import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SubMenu from "./submenu";
import { menuAnimation, menuItemAnimation } from "../../utils/animate";



const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) {
            setIsMenuOpen(false);
        }
    }, [isOpen]);

    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                <div className="menu_item ">
                    <div className="menu-icon">{<route.icon />}</div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="link_text "
                            >
                                {route.name}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {isOpen && (
                    <motion.div
                        animate={
                            isMenuOpen
                                ? { rotate: 90 }
                                : { rotate: 0 }
                        }
                    >
                        <FaAngleRight />
                    </motion.div>
                )}
            </div>
            <SubMenu subMenus={route.subMenus} isOpen={isMenuOpen} showAnimation={showAnimation} />
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="menu_container "
                    >
                        {route.subRoutes?.map((subRoute, i) => (
                            <motion.div variants={menuItemAnimation} key={i} custom={i}>
                                {subRoute.subMenus ? (
                                    <SidebarMenu
                                        route={subRoute}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                    />
                                ) : (
                                    <NavLink to={subRoute.path} className="link  ">
                                        <div className="menu-icon">{<subRoute.icon />}</div>
                                        <motion.div className="link_text">{subRoute.name}</motion.div>
                                    </NavLink>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SidebarMenu;
