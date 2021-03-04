import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import getBase64 from "../../../utils/getBase64";

function Add() {
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);
  const [tempImage, setTempimage] = useState("");
  const [state, setState] = useState({
    image: "",
    name: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      console.log("image", event.target.files[0]);
      //   let data = state.image;
      //   data = event.target.files[0];

      getBase64(event.target.files[0], (res) => {
        console.log("res", res);
        setTempimage(res);
        setState((prevState) => ({
          ...prevState,
          image: event.target.files[0],
        }));
      });
    } else {
      console.log(name + value);
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsloading(true);
    console.log("add", state);

    var obj = {
      name: state.name,
      price: state.price,
    };

    let data = new FormData();
    data.append("image", state.image);
    data.append("data", JSON.stringify(obj));

    axios
      .post("https://unravelserver-rgqnm.ondigitalocean.app/item/add", data)
      .then((response) => {
        console.log("res", response);
        history.push("/items");
        setIsloading(false);
      })
      .catch((error) => {
        console.log("err front", error);
        setIsloading(false);
      });
  };

  const { image, name, price } = state;
  return (
    <Layout>
      <section id="items">
        <div className="container">
          <h4>Add Item</h4>
          <form onSubmit={onSubmit} className="form-wrap">
            <Input name="image" type="file" handleChange={handleChange} />
            {tempImage ? (
              <img src={tempImage} alt="temp" />
            ) : (
              <img
                src="https://via.placeholder.com/600x600?text=1:1"
                alt="temp"
              />
            )}
            <Input name="name" value={name} handleChange={handleChange} />
            <Input
              name="price"
              type="number"
              value={price}
              handleChange={handleChange}
            />
            <button
              type="submit"
              disabled={
                image === "" || name === "" || price === "" || isLoading
              }
              className="btn btn-main"
            >
              {isLoading ? "Adding item..." : "Add"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
export default Add;
