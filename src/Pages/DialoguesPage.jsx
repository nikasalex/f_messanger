import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialogues, Messages } from '../components';
import { Layout, theme } from 'antd';
import React, { useEffect } from 'react';

const { Sider, Content } = Layout;



export function DialoguesPage() {
 const navigate = useNavigate();
 const location = useLocation();
 const dialogueId = location.pathname.split('dialogues/')[1];
 useEffect(()=>{
  axios
  .get('http://localhost:3001/user', {
    withCredentials: true,
  })
  .then((data) => {
    if (!data.data) {
      navigate('/');
    }
  });
 })
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} >
        <div className="logo" />
        <Dialogues />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {dialogueId && <Messages />}
        </Content>
      </Layout>
    </Layout>
  );
}
