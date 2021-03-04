import { useHistory, Link } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import { useEffect } from "react";

function Navbar() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
  console.log("decoded", decoded);

  const onLogout = () => {
    console.log("logging out");
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    let decoded = token ? jsonwebtoken.verify(token, "unravelstan") : false;
    console.log("useEffect decoded", decoded);
  }, [token]);
  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">Unravel CMS</Link>
      </div>
      <hr />
      {decoded ? (
        <>
          <div className="text-center nav-profile">
            Hello, admin.{" "}
            <button type="button" onClick={() => onLogout()}>
              Logout
            </button>
          </div>
          <div className="text-center nav-menu">
            <Link to="/items">Items</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/transactions">Transactions</Link>
          </div>
        </>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
