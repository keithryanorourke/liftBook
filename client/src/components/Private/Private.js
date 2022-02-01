import Footer from '../Footer/Footer';
import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookie from "js-cookie"

const Private = ({children}) => {
    const location = useLocation()
    const [authentication, setAuthentication] = useState({
        isAuthenticating: true,
        isAuthenticated: false,
        token: null,
    })
    
    useEffect(() => {
        const token = Cookie.get("token")
        if(!token) {
            if(location.pathname !== "/")
            alert("You must be logged in to view this page, please login or create an account!")
            setAuthentication(prevState => ({
                ...prevState,
                isAuthenticating: false,
                isAuthenticated: false
            }))
        } else {
            axios.get(`http://localhost:8080/account/check-auth`, 
                { headers: {
                    Authorization: `Bearer: ${token}`
                    } 
                })
                .then((response) => {
                    return setAuthentication(_prevState => ({
                        isAuthenticating: false,
                        isAuthenticated: true,
                        token
                    }));
                })
                .catch((error) => {
                    alert("You must be logged in to view this page, please login or create an account!")
                    Cookie.remove("token")
                    return setAuthentication(prevState => ({
                        ...prevState,
                        isAuthenticating: false,
                        isAuthenticated: false
                    }));
                });
        }
    }, [location.pathname])
    
        const ElementToRender = children.type
        if (authentication.isAuthenticating) {
            return null;
        }
        else if (authentication.isAuthenticated) {
            return  (
            <>
                <main>
                    <ElementToRender token={authentication.token} />
                </main>
                <Footer />
            </>
            )
        }
        else {
            return <Navigate to="/login"/>
        }
    }

export default Private;