import React, { useContext } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Reader = () => {
  const navigate = useNavigate()
  const logout = useLogout

  const signOut = async () => {
    await logout()
    navigate('/register')
  }
  return (
    <button onClick={signOut}>Sign Out</button>
    )
};

export default Reader;
