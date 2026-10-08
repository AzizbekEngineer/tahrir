import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const MainLayout = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <>
            <Header />
            <main key={location.pathname} className="page-enter">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout