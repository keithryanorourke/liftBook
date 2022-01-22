import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from "js-cookie"


class Private extends React.Component {
    state = {
        isAuthenticating: true,
        isAuthenticated: false,
        token: null,
    }

    componentDidMount() {
        console.log(this.props.children)
        const token = Cookie.get("token")
        if(!token) {
            this.setState({
                isAuthenticating: false,
                isAuthenticated: false
            })
        } else {
            axios.get(`http://localhost:8080/account/check-auth`, 
                { headers: {
                    Authorization: `Bearer: ${token}`
                    } 
                })
                .then((response) => {
                    console.log("THEN")
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true,
                        token
                    });
                })
                .catch((error) => {
                    console.log("CATCH")
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: false
                    });
                });
        }
    }

    render() {
        const { element: Element, ...rest } = this.props;
        if (this.state.isAuthenticating) {
            console.log("AUTHENTICATING")
            return null;
        }
        else if (this.state.isAuthenticated) {
            console.log("PASS")
            return this.props.children
        }
        else {
            console.log("FAIL")
            return <Navigate to="/login"/>
        }
    }
}

export default Private;