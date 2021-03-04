import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import axios from "axios";

import formatCurrency from "../../../utils/currencyFormat";

function Detail() {
  const { id } = useParams();

  const [isLoading, setIsloading] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`https://unravelserver-rgqnm.ondigitalocean.app/item/detail/${id}`)
      .then((response) => {
        console.log("res get", response);
        setIsloading(false);
        setItem(response.data);
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
          ) : item === null ? (
            <div>No item found.</div>
          ) : (
            <div>
              <h4>Item detail</h4>
              <div className="list-item detail">
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div>{formatCurrency(item.price)}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
export default Detail;
