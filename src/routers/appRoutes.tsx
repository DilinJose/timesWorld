import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/login'
import Home from '../pages/home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
             <Route path='home' element={<Home />} />
        </Routes>
    )
}

export default AppRoutes