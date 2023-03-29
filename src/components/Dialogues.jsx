import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Menu, Space, Alert } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { socket } from '../socket'

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new chat"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="nameDialogue"
          label="Chat name"
          rules={[
            {
              required: true,
              message: 'Please input the name of chat!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="emailTo"
          label="User`s email"
          rules={[
            {
              required: true,
              message: 'Please input the user`s email!',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export function Dialogues() {
  const location = useLocation();
  const dialogueId = location.pathname.split('dialogues/')[1];
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    axios
      .post('http://mykyta-matvieiev.com:3001/dialogues', values, {
        withCredentials: true,
      })
      .then((data) => {
        navigate('/dialogues');
      })
      .catch((e) => {
        if (e.response.status === 403 || e.response.status === 404) {
          if (typeof e.response.data.message === typeof {}) {
            setError(e.response.data.message.issues[0].message);
          } else {
            setError(e.response.data.message);
          }
        }
      });
    navigate('/dialogues');
    setOpen(false);
  };
  const [dialogues, setDialogues] = useState([]);
  const [ nDialogue, setnDialogue ] = useState({})

  useEffect(()=>{
    socket.on('createDialogue', (dialogue) => {
          setnDialogue(dialogue)
          dialogues.push(dialogue)
    });
    socket.on('deletedialogue',()=>{
          setnDialogue({})
           navigate('/dialogues')
    })

  })
  useEffect(() => {
    axios
    .get('http://mykyta-matvieiev.com:3001/dialogues', { withCredentials: true })
    .then((data) => {
      setDialogues(data.data);
      });
  }, [nDialogue]);

  const onDelete = () => {
    axios
      .get(`http://mykyta-matvieiev.com:3001/dialogue/removedialogue/${dialogueId}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        items={dialogues.map((dialogue) => {
          return {
            key: dialogue.id,
            icon: <WechatOutlined />,
            label: (
              <Link to={`/dialogues/${dialogue.id}`}>{dialogue.name}</Link>
            ),
          };
        })}
      />{' '}
      <br />
      <div>
        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            New Chat
          </Button>
        
          <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
        <Button
            type="link"
            onClick={onDelete}
          >
            Delete dialogue
          </Button>
          </Form.Item>
        {error && (
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 20,
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert message={error} type="error" />
            </Space>{' '}
          </Form.Item>
        )}
      </div>
    </>
  );
}
