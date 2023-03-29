import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Input, Form, Button} from 'antd';
import { socket } from '../socket'

export function Messages() {
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dialogueId = location.pathname.split('dialogues/')[1];
  const [msgState, setMsgState] = useState({})
 
useEffect(()=>{
  socket.on('msg',(message)=>{
    setMsgState(message)
  })
  socket.on('deletemsg',()=>{
         setMsgState({})
  })

  return () => {
    socket.off('msg');
    socket.off('deletemsg');
  }
},[])

 

  useEffect(() => {
    axios
      .get(`http://mykyta-matvieiev.com:3001/dialogue/${dialogueId}`, {
        withCredentials: true,
      })
      .then((data) => {
        setMessages(data.data);
      })
      .catch((e)=>{
        if(e.response.status === 403){
          console.log(e.response.data.message)
          navigate('/dialogues')
        }
      });
  }, [dialogueId, msgState]);

  const onFinish = (values) => {
    axios
      .post(`http://mykyta-matvieiev.com:3001/dialogue/${dialogueId}`, values, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onDelete = () => {
    axios
      .get(`http://mykyta-matvieiev.com:3001/dialogue/removemsg/${dialogueId}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
const Messages = messages.map((message) => {
  const year = message.createAt.split('.')[0].split('T')[0].split('-').reverse().join('.');
  const time = message.createAt.split('.')[0].split('T')[1]
  return (
    <span key={message.id}>
      <p>{message.user.firstName} {message.user.lastName} {year} {time}</p>
      <p>{message.message}</p><br/>
    </span>
  );
})
  return (
<>
<Button  onClick={onDelete}>
            Remove messages
      </Button>

      <br/>
     
       <ul>
        {Messages}
      </ul>
      <br />
      
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="message" >
          <Input placeholder='Write your message...'  />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" >
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
