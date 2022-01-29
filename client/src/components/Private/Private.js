import Footer from '../Footer/Footer';
import React, {useEffect, useState} from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from "js-cookie"

const Private = ({children}) => {
    const [authentication, setAuthentication] = useState({
        isAuthenticating: true,
        isAuthenticated: false,
        token: null,
    })
    
    useEffect(() => {
        const token = Cookie.get("token")
        if(!token) {
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
                    Cookie.remove("token")
                    return setAuthentication(prevState => ({
                        ...prevState,
                        isAuthenticating: false,
                        isAuthenticated: false
                    }));
                });
        }
    }, [])
    
        const ElementToRender = children.type
        if (authentication.isAuthenticating) {
            return null;
        }
        else if (authentication.isAuthenticated) {
            return <div>
                <ElementToRender token={authentication.token} /><Footer />
            </div>
        }
        else {
            return <Navigate to="/login"/>
        }
    }

export default Private;