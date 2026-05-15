// usePollSocket.js
import { useEffect } from 'react';
import socket from './socket-setup';
import { useAuth } from '@clerk/react';

const usePollSocket = (pollId: string, setOptions: (options: any) => void, setVotes: (votes: number) => void, setStatus: (status: string) => void) => {
  const { getToken } = useAuth();

  useEffect(() => {
    const connect = async () => {
      const token = await getToken(); // fresh from Clerk

      socket.auth = { token }; // attach before connecting
      socket.connect();

      socket.emit('join:poll', pollId);

      socket.on('vote:updated', ({ options, votes }) => {
        setOptions(options);
        setVotes(votes);
      });

      socket.on('poll:closed', ({ options }) => {
        setOptions(options);   // final counts
        setStatus('Closed');   // your UI reacts to this — disable buttons, show banner
      });
    };

    connect();

    return () => {
      socket.emit('leave:poll', pollId);
      socket.off('vote:updated');
      socket.off('poll:closed');
      socket.disconnect();
    };
  }, [pollId]);
};

export default usePollSocket;