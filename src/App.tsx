import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Detail from './pages/Detail';
import Forgot from './pages/Forgot';
import SetPassword from './pages/SetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="reset-password" element={<SetPassword />} />
      <Route path="movies/:movieUuid" element={<Detail />} />
    </Route>,
  ),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
