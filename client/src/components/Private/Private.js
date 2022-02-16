import Footer from '../Footer/Footer';
import React, {useEffect, useState} from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from "js-cookie"
const {REACT_APP_BACKEND_URL} = process.env

const Private = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [authentication, setAuthentication] = useState({
        isAuthenticating: true,
        isAuthenticated: false,
        token: null,
    })
    const [userSettings, setUserSettings] = useState(null)
    
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
            axios.get(`${REACT_APP_BACKEND_URL}/account/check-auth`, 
                { headers: {
                    Authorization: `Bearer: ${token}`
                    } 
                })
                .then((response) => {
                    axios.get(`${REACT_APP_BACKEND_URL}/account/settings`, { headers: 
                        {
                        Authorization: `Bearer: ${token}`
                        } 
                    })
                    .then(response => {
                        setUserSettings(response.data)
                    })
                    .catch(error =>{
                        alert(`${error}.\nUser settings not retrieved! You will now be logged out.`)
                        Cookie.remove('token')
                        navigate('../login', {replace: true})
                    })
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
                    <ElementToRender token={authentication.token} userSettings={userSettings}/>
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