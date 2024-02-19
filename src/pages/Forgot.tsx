import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { forgot } from '../libs/api';

const Forgot: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    document.title = 'Demo - Regis';
  }, []);

  const onFinish = async (payload: any) => {
    const { data } = await forgot(payload);
    if (data.status === 'success') {
      api.success({
        message: 'Request done!',
        description: data.message,
      });
    } else {
      api.error({
        message: 'Request failed',
        description: data.message,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={containner}>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={loginForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={loginFormButton}>
            Reset Password
          </Button>
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

const loginFormButton: React.CSSProperties = {
  width: '100%',
};

export default Forgot;
