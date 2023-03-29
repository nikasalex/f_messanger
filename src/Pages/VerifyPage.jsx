import { Button, Form, Input, Alert, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export function VerifyPage(){
  const [error, setErorr] = useState('');
  const [message, setMessage] = useState('');
  const onFinish = (values) => {
    axios
  .post('http://mykyta-matvieiev.com:3001/verify', values, {
    withCredentials: true,
  })
  .then((data) => {
    if (data.status === 200) {
      setMessage(data.data.message);
    }
  })
  .catch((e) => {
    if (e.response.status === 403 || e.response.status === 404) {
      if (typeof e.response.data.message === typeof {}) {
        setErorr(e.response.data.message.issues[0].message);
      } else setErorr(e.response.data.message);
    }
  });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    return(
        <div>
            <h1>Verify Account:</h1>
       <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {error && (
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert message={error} type="error" />
            </Space>{' '}
          </Form.Item>
        )}
        {message && (
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert message={message} type="success" />
            </Space>
          </Form.Item>
        )}
  
        <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Send mail
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}