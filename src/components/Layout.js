import Navbar from "./Navbar";

function Layout(props) {
  //   const handleLogout = () => {
  //     props.handleLogout();
  //   };
  return (
    <div className="main-wrapper">
      {props.isGuest ? (
        <></>
      ) : (
        <div className="main-navbar">
          <Navbar />
        </div>
      )}
      <div className="main-content">{props.children}</div>
    </div>
  );
}

export default Layout;
