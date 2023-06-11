import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/reader">Reader</Link>
        </li>
        <li>
          <Link to="/writer">Writer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
