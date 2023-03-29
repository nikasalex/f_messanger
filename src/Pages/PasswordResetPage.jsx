import { Button, Form, Input, Space, Alert } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';



export function PasswordResetPage() {
  const [error, setErorr] = useState('');
  const [message, setMessage] = useState('');
  const onFinish = (values) => {
    values.token = token
    axios
    .post('http://mykyta-matvieiev.com:3001/passwordreset', values, {
      withCredentials: true,
    })
    .then((data) => {
      console.log(data)
      if (data.status === 200) {
        setMessage(data.data.message)
      }
    })
    .catch((e) => {
      console.log(e)
      if (e.response.status === 403 || e.response.status === 404) {
        if (typeof e.response.data.message === typeof {}) {
          setErorr(e.response.data.message.issues[0].message);
        } else setErorr(e.response.data.message);
      } else if( e.response.status === 301 ){
        setErorr(e.response.data.message)
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  return (
    <div>
      <h1>Password Reset:</h1>
     
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
    initialValues={
      token
    }
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

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Password Confirmation"
      name="passwordAgain"
      rules={[
        {
          required: true,
          message: 'Please input your password confirmation!',
        },
      ]}
    >
      <Input.Password />
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
            </Space><br/><br/>
            <Button type="primary" href='/forgotpass'>
        Return
      </Button>
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
            </Space><br/><br/>
            <Button type="primary" href='/'>
        Login
      </Button>
          </Form.Item>
            
        )}

   <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Reset
      </Button>
    </Form.Item>
  </Form>
    </div>
  );
}
