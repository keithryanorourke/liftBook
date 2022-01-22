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
        // Send an Auth check request to the server
        // don't forget to set axios to send requests withCredentials
        // it allows for cookies to be passed to backend
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
        // Return a Route with all original props passed to it
        // and a custom render prop that waits for component to
        // finish authenticating and for successful auth
        // render component and also pass user object provided by server as a prop
        // otherwise redirect back to login page while pasing it
        // a current route so it can redirect back to page you came from
        // return (this.state.isAuthenticating ? null : 
        // (this.state.isAuthenticated ? this.props.children : <Navigate to="/login"></Navigate>))
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

            // <Route {...rest} render={(props) => {
            //     // While authenticating, don't show anything
            //     // alternatively this could be a loading indicator
            //     if (this.state.isAuthenticating) return null;
                
            //     return this.state.isAuthenticated ? (
            //         <Element token={this.state.token} {...props} />
            //     ) : (
            //             <Navigate to={{
            //                 pathname: '/login',
            //                 state: {from: props.location}
            //         }} />
            //     )
            // }}>
                
            // </Route>
        
    }
}

export default Private;