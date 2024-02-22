import { HomeTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Menu, Input } from 'antd';
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../store/user';
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('h');
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const { Search } = Input;

  const onClick = (e: any) => {
    setCurrent(e.key);
  };
  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    navigate(0);
  };

  const onSearch = (e: any) => {
    navigate(`/?search=${e}`);
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="h" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="s" disabled>
          <Search placeholder="input search text" onSearch={onSearch} />
        </Menu.Item>
        {user ? (
          <>
            <Menu.Item
              key="u"
              icon={<CheckCircleTwoTone />}
              style={{
                marginLeft: 'auto',
                whiteSpace: 'normal',
                height: 'auto',
              }}
              disabled
            >
              <div style={{ display: 'inline' }}>Welcome {user.email}!</div>
            </Menu.Item>
            <Menu.Item
              key="o"
              style={{ whiteSpace: 'normal', height: 'auto' }}
              disabled
            >
              <Button type="link" block onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            key="l"
            icon={<CheckCircleTwoTone />}
            style={{ marginLeft: 'auto', whiteSpace: 'normal', height: 'auto' }}
          >
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
      <Outlet />
    </>
  );
};

export default Header;
