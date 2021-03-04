import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import axios from "axios";

function List() {
  const [isLoading, setIsloading] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setIsloading(true);
    axios
      .get("http://localhost:4000/user/list")
      .then((response) => {
        console.log("res", response);
        setIsloading(false);
        setCustomers(response.data);
        // if (response.data.success) {
        //   localStorage.setItem("token", response.data.data.token);
        //   history.push("/");
        //   // props.handleLogin();
        // } else {
        //   alert(response.data.message);
        // }
      })
      .catch((err) => {
        setIsloading(false);
        console.log("err", err.message);
      });
  }, []);
  return (
    <Layout>
      <section id="customers">
        <div className="container">
          {isLoading ? (
            <div>Loading...</div>
          ) : customers.length < 1 ? (
            <div>No customer</div>
          ) : (
            <div>
              <h4>Customers list</h4>
              {customers.map((customer) => {
                return (
                  <div className="list-item">
                    <div>{customer.firstname}</div>
                    <div>{customer.lastname}</div>
                    <Link to={`/customers/detail/${customer._id}`}>
                      View details
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
export default List;
