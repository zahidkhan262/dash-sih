import React from 'react'
import SideBar from '../layout/sidebar/sidebar'
import Header from '../layout/header'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/login'
import Home from '../layout/home'
import Register from '../pages/auth/register'
import { useAuth } from '../context'
import PrivateRoute from './private-route'
import DashboardPage from '../pages/dashboard'

const Routing = () => {

    return (

        <Routes>
            {/* public route */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* protect route */}
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<DashboardPage />} />
            </Route>

        </Routes>

    )
}

export default Routing