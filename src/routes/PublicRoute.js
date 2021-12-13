import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <React.Fragment>
            {!isAuthenticated ? (
                <Outlet
                    {...rest}
                    render={({ location }) => (
                        <Component
                            location={location}
                        />
                    )}
                />
            ) : (
                    <Navigate to={{
                        pathname: '/',
                        state: { from: rest.location }
                    }} />
                )}
        </React.Fragment>
    )
}


PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}