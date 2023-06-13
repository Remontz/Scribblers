import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from './components/Layout';

import Admin from './views/Admin'
import Reader from './views/Reader'
import Writer from './views/Writer'
import Unauthorized from './views/Unauthorized';
import Home from './views/Home';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* protected routes [logged in]*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2292]} />}>
            <Route path='reader' element={<Reader />} />
          </Route>
    
          <Route element={<RequireAuth allowedRoles={[1131, 3840]}/>}>
            <Route path='writer' element={<Writer />} />
          </Route>
    
          <Route element={<RequireAuth allowedRoles={[3840]}/>}>
            <Route path='admin' element={<Admin />} />
          </Route>
        </Route>

        {/* catch all any request that doesn't match a request...404 page  */}
        {/* <Route path='*' element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
