import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

import LimitedRoute from "./components/LimitedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Items from "./pages/Items";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Switch>
        <LimitedRoute path="/login" component={() => <Login />} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/items" component={Items} />
        <ProtectedRoute path="/customers" component={Customers} />
        <ProtectedRoute path="/transactions" component={Transactions} />
      </Switch>
    </Router>
  );
}

export default App;
