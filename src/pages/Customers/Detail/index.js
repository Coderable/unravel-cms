import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import axios from "axios";

function Detail() {
  const { id } = useParams();

  const [isLoading, setIsloading] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`https://unravelserver-rgqnm.ondigitalocean.app/user/list/id/${id}`)
      .then((response) => {
        console.log("res", response);
        setIsloading(false);
        setCustomer(response.data);
      })
      .catch((err) => {
        setIsloading(false);
        console.log("err", err.message);
      });
  }, [id]);
  return (
    <Layout>
      <section id="customers">
        <div className="container">
          {isLoading ? (
            <div>Loading...</div>
          ) : customer === null ? (
            <div>No customer found.</div>
          ) : (
            <div>
              <h4>Customers detail</h4>
              <div className="list-item detail">
                <div>{customer.firstname}</div>
                <div>{customer.lastname}</div>
                <div>{customer.email}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
export default Detail;
