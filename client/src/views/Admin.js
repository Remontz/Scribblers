import { HashLink as Link } from "react-router-hash-link";
import Users from './Users'

const Admin = () => {
  return (
    <div>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <br />
      <Link to='/login'>Login</Link>
    </div>
  )
};

export default Admin;
