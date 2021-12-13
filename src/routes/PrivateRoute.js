import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    //guardar la ultima ruta en localStorage con react-router-dom
    //const saveLastRoute = localStorage.setItem('lastPath', useLocation().pathname);

    return (
        <React.Fragment>
            {isAuthenticated ? (
                <Outlet
                    {...rest}
                    render={({ location }) => (
                        <Component
                            //saveLastRoute={saveLastRoute}
                            location={location}
                        />
                    )}
                />
            ) : (
                <Navigate to={{
                    pathname: 'auth/login',
                    state: { from: rest.location }
                }} />
            )}
        </React.Fragment>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}