import React from "react";
import { Route, Redirect } from "react-router-dom";

import jsonwebtoken from "jsonwebtoken";

const LimitedRoute = ({ component: Component, user, ...rest }) => {
  const token = localStorage.getItem("token");
  let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
  console.log("decoded", decoded);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token || (token ? Date.now() / 1000 > decoded.exp : false)) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default LimitedRoute;
