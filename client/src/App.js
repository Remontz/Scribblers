import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth';
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* protected routes [logged in]*/}
        <Route path='/' element={<RequireAuth />}>
          {/* All protected Routes */}
        </Route>

        {/* catch all any request that doesn't match a request...404 page  */}
        {/* <Route path='*' element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
