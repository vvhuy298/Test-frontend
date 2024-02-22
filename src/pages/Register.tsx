import React, { useEffect } from 'react';
// import { Button, Form, Input } from 'antd';
// import { login } from '../libs/api';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logged } from '../store/user';
// import { clearToMovies } from '../store/movies';
import Title from 'antd/es/typography/Title';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = 'Demo - Register';
  }, []);
  /* const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (payload: any) => {
    const { data } = await login(payload);
    dispatch(logged(data));
    dispatch(clearToMovies());
    navigate('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }; */

  return (
    <div style={containner}>
      <Title level={2}>Under Construction</Title>
      {/* <Form
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={loginFormButton}>
            Registration
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  );
};

const containner: React.CSSProperties = {
  paddingTop: 30,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

export default Register;
