import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Input, Alert, Space } from 'antd';
import { useState } from 'react';
import { socket } from '../socket'

export function LoginPage() {
  const [error, setError] = useState('');
  const [passState, setPassState] = useState(false)
  
  
  const onFinish = (values) => {
    axios
      .post('http://mykyta-matvieiev.com:3001/login', values, {
        withCredentials: true,
      })
      .then((data) => {
        if (data.status === 200) {
          socket.connect();
          navigate('/dialogues');
        }
      })
      .catch((e) => {
        
        if (e.response.status === 403 || e.response.status === 404) {
          if (typeof e.response.data.message === typeof {}) {
            setError(e.response.data.message.issues[0].message);
          } else {
            setError(e.response.data.message)
            if(e.response.data.message === 'Password incorrect' ){
              setPassState(true)
            }
          };
        } else if (e.response.status === 301) {
          alert('You are not verified')
          navigate('/verify');
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const navigate = useNavigate();
  axios
    .get('http://mykyta-matvieiev.com:3001/user', {
      withCredentials: true,
    })
    .then((data) => {
      if (data.data) {
        navigate('/dialogues');
      }
    });
  return (
    <div><br/><br/>
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
        initialValues={{
          remember: true,
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

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" >
            Login
          </Button>
        </Form.Item>
       { passState && <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" href="/forgotpass">
            Forgot Password
          </Button>
        </Form.Item>}
      </Form>
    </div>
  );
}
