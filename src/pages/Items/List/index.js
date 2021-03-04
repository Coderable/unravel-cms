import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import axios from "axios";

import formatCurrency from "../../../utils/currencyFormat";

function Items() {
  const [isLoading, setIsloading] = useState(false);
  const [items, setItems] = useState([]);

  const deleteItem = (id) => {
    //   setIsloading(true);
    alert("Deleteing item");
    axios
      .delete("http://localhost:4000/item/delete/" + id)
      .then((response) => {
        console.log("res", response);
        fetchItem();
      })
      .catch((error) => {
        console.log("err front", error);
        alert("Something went wrong when deleting item");
        setIsloading(false);
      });
  };

  const fetchItem = () => {
    setIsloading(true);
    axios
      .get("http://localhost:4000/item/list")
      .then((response) => {
        console.log("res", response);
        // history.push("/items");
        setIsloading(false);
        setItems(response.data);
      })
      .catch((error) => {
        console.log("err front", error);
        setIsloading(false);
      });
  };

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <Layout>
      <section id="items">
        <div className="container">
          <h4>Items</h4>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            items.map((item) => {
              return (
                <div className="list-item items">
                  <div className="item-wrap">
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>{item.name}</div>
                    <div>{formatCurrency(item.price)}</div>
                  </div>
                  <div className="item-wrap">
                    <div className="btn neutral">
                      <Link to={`/items/detail/${item._id}`}>View</Link>
                    </div>
                    <div className="btn neutral">
                      <Link to={`/items/edit/${item._id}`}>Edit</Link>
                    </div>
                    <div
                      className="btn neutral"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Link to="/items/add">Add Item</Link>
      </section>
    </Layout>
  );
}
export default Items;
