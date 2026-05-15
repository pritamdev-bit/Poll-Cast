import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false, // ← don't connect immediately, wait for token
});


export default socket;