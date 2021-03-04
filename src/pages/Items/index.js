import React from "react";
import { Route } from "react-router-dom";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import Detail from "./Detail";

function Items() {
  return (
    <React.Fragment>
      <Route exact path={`/items`} component={List} />
      <Route path={`/items/add`} component={Add} />
      <Route path={`/items/edit/:id`} component={Edit} />
      <Route path={`/items/detail/:id`} component={Detail} />
    </React.Fragment>
  );
}

export default Items;
