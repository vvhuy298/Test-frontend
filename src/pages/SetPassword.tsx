import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updatePassword } from '../libs/api';

const SetPassword: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Demo - Regis';
  }, []);

  const onFinish = async (payload: any) => {
    payload.token = token;
    const { data } = await updatePassword(payload);
    if (data.status === 'success') {
      api.success({
        message: 'Request done!',
        description: data.message,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
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
          label="Password"
          name="password"
          rules={[{ required: true, min: 8 }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Re-Password"
          name="repassword"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Re-Password" />
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

export default SetPassword;
