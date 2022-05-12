import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// Context
import { AuthContext } from "../../../contexts/authContext";

// Components
import Loading from "../Loading";


export default function PrivateRoute ({path, component: Component, ...props}) {
    console.log('path: ', path, ' -Component: ', props);

  // App Context
    const { isAuthenticated, isLoading } = useContext(AuthContext)

   console.log(isAuthenticated, isLoading, ' Verify if Context is sending a data');

  return (
    // <Route path={path} component={Component} />
    <Route
            {...props}
            render={(props) =>
                isLoading ? (
                    <Loading />
                ) : isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/auth",
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />
  )
}