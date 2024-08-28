import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [isActive, setIsActive] = useState(true);
    const [isNotification, setIsNotification] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    const handleToggleBar = () => setIsActive((prev) => !prev)
    const handleToggleNotification = () => setIsNotification((prev) => !prev)
    const handleToggleProfile = () => setIsProfile((prev) => !prev)




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotification(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    const value = {
        handleToggleBar,
        isActive,
        isNotification,
        handleToggleNotification,
        isProfile,
        handleToggleProfile,
        notificationRef,
        profileRef
    }

    return (

        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useAuth must be used within a DataContext provider');
    }
    return context
}

export default DataProvider