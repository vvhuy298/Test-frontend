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
import { useLayoutEffect } from 'react';
import { onResponseError, onResponseErrorEject } from './libs/axios';
import { AxiosError } from 'axios';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from './store/user';

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
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const id = onResponseError(async (error: AxiosError) => {
      const status = error?.response?.status;
      if (status === 401) {
        modal.error({
          title: 'Unauthenticated',
          content: `You need login again`,
          onOk() {
            console.log('OK');
            dispatch(logout());
          },
          onCancel() {},
        });
      }
      return Promise.reject(error);
    });
    return () => {
      onResponseErrorEject(id);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      {contextHolder}
    </>
  );
}

export default App;
