import { NavLink } from "react-router-dom";
import React from "react";
import SidebarMenu from "./sidebarmenu";
import { routes } from "../../utils/data";
import { FaProjectDiagram } from "react-icons/fa";

const SideBar = ({ children, setIsOpen, isOpen, isActive }) => {
    return (
        <>
            <div className="main-container">
                <div
                    className="sidebar"
                    style={{
                        width: isActive ? "260px" : "55px",
                        transition: "width 0.5s ease-in-out",
                    }}
                >
                    <div className="logo">
                        <FaProjectDiagram className="text-primary" />
                        {isActive && (
                            <span className="">
                                User Dash
                            </span>
                        )}
                    </div>

                    <section className="routes">
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        key={index}
                                        setIsOpen={setIsOpen}
                                        route={route}
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
                                    {isOpen && (
                                        <div className="link_text sidebar-menu">
                                            {route.name}
                                        </div>
                                    )}
                                </NavLink>
                            );
                        })}
                    </section>
                </div>

                <main className={isActive ? "isMain" : ""}>{children}</main>
            </div>
        </>
    );
};

export default SideBar;
