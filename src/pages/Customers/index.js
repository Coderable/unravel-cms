import React from "react";
import { Route } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";

function Customers() {
  return (
    <React.Fragment>
      <Route exact path={`/customers`} component={List} />
      <Route path={`/customers/detail/:id`} component={Detail} />
    </React.Fragment>
  );
}

export default Customers;
