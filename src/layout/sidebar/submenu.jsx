import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { menuAnimation, menuItemAnimation } from "../../utils/animate";



const SubMenu = ({ subMenus, isOpen, showAnimation }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={menuAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="menu_container"
                >
                    {subMenus?.map((subMenu, i) => (
                        <motion.div variants={menuItemAnimation} key={i} custom={i}>
                            <NavLink to={subMenu.path} className="link">
                                {/* <div className="menu-icon">{subMenu.icon}</div> */}
                                <motion.div className="link_text">{subMenu.name}</motion.div>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SubMenu;
