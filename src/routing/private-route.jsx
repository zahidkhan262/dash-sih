import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../layout/sidebar/sidebar';
import { useAuth } from '../context';
import Header from '../layout/header';

const PrivateRoute = () => {
    const { isActive, handleToggleBar } = useAuth();
    const [isOpen, setIsOpen] = useState(true);

    const isAuth = true;

    return isAuth ?
        <SideBar isActive={isActive}  setIsOpen={setIsOpen} isOpen={isOpen} handleToggleBar={handleToggleBar}>
            <Header />
            <Outlet />
        </SideBar>

        : <Navigate to="/login" replace />
}

export default PrivateRoute