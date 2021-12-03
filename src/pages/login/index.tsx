import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '@/apis';

import styles from './index.module.scss';

const Login: React.FC<any> = () => {
  let history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await login(values);
    if (res.code === 0) {
      message.success('登录成功');
      history.push('/main/home');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.loginTitle}>vite框架模板</div>

        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<KeyOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button className={styles.loginBtn} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
