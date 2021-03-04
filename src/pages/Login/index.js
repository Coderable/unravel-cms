import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name + value);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("login submitted", state);
    setIsloading(true);
    axios
      .post("http://localhost:4000/admin/login", state)
      .then((response) => {
        console.log("res", response);
        setIsloading(false);
        if (response.data.success) {
          localStorage.setItem("token", response.data.data.token);
          history.push("/");
          // props.handleLogin();
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log("err", err.message);
      });
  };

  const { email, password } = state;

  return (
    <Layout isGuest>
      <section id="login">
        <div className="container half-wrap card big">
          <div>
            <h4>Login</h4>
            <form onSubmit={onSubmit}>
              <Input name="email" value={email} handleChange={handleChange} />
              <Input
                name="password"
                type="password"
                value={password}
                handleChange={handleChange}
              />
              <button
                type="submit"
                disabled={email === "" || password === "" || isLoading}
                className="btn btn-main"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default Login;
