import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import getBase64 from "../../../utils/getBase64";

function Edit() {
  const { id } = useParams();
  const history = useHistory();
  const [firstLoad, setFirstload] = useState(false);
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

    // let data = new FormData();
    // data.append("data", JSON.stringify(obj));

    axios
      .put("http://localhost:4000/item/update/" + id, obj)
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

  useEffect(() => {
    setFirstload(true);
    axios
      .get(`http://localhost:4000/item/detail/${id}`)
      .then((response) => {
        console.log("res get", response);
        setFirstload(false);
        setTempimage(response.data.image);
        setState((prevState) => ({
          ...prevState,
          name: response.data.name,
          price: response.data.price,
        }));
      })
      .catch((err) => {
        setFirstload(false);
        console.log("err", err.message);
      });
  }, [id]);

  const { name, price } = state;
  return (
    <Layout>
      <section id="items">
        <div className="container">
          <h4>Edit Item</h4>
          {firstLoad ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={onSubmit} className="form-wrap">
              <label for="image">image</label>
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
                disabled={name === "" || price === "" || isLoading}
                className="btn btn-main"
              >
                {isLoading ? "Editting item..." : "Edit"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
export default Edit;
