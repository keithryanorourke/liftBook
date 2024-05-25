import Footer from '../Footer/Footer';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsClient, useLocalStorage } from 'usehooks-ts';

const Private = ({ children }) => {
    const [token] = useLocalStorage("token", null);
    const isClient = useIsClient();

    
    if (!isClient) {
        return null;
    }
    
    if (!token) {
        return <Navigate to="/login" />
    }
    
    return (
        <>
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Private;