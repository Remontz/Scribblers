import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App">
      <Outlet /> 
      {/* // represents all the children of the Layout component */}
    </main>
  );
};

export default Layout;
