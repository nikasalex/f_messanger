import { io } from 'socket.io-client';

export const socket = io('http://mykyta-matvieiev.com:3001', {
  withCredentials: true,
  autoConnect: false,
});
