import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { login } from '../libs/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logged } from '../store/user';
import { clearToMovies } from '../store/movies';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Demo - Login';
  }, []);

  const onFinish = async (payload: any) => {
    const { data } = await login(payload);
    dispatch(logged(data));
    dispatch(clearToMovies());
    navigate('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={containner}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={loginForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ width: '100%' }}
        >
          <Link style={loginFormForgot} to="/forgot">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={loginFormButton}>
            Submit
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const containner: React.CSSProperties = {
  paddingTop: 30,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

const loginForm: React.CSSProperties = {
  width: '400px',
};

const loginFormForgot: React.CSSProperties = {
  float: 'right',
  marginLeft: 'auto',
};

const loginFormButton: React.CSSProperties = {
  width: '100%',
};

export default Login;
