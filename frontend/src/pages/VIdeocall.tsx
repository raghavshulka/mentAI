import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';

const serverUrl = 'wss://vd-integrate-84o3ai2y.livekit.cloud';
interface TokenResponse {
  token: string;
}
interface Message {
  sender: string;
  message: string;
}

export default function VideoCall() {
  const [token, setToken] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participantName, setParticipantName] = useState<string>('');

  useEffect(() => {
    const name = prompt('Enter your name:');
    if (name) {
      setParticipantName(name);
    } else {
      alert('Name is required to participate in the session.');
    }
  }, []);

  const fetchToken = async (room: string) => {
    if (!participantName) {
      console.error('Participant name is required');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/v1/video/token?roomName=${encodeURIComponent(room)}&participantName=${encodeURIComponent(participantName)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: TokenResponse = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const handleCreateRoom = () => {
    const newRoomName = prompt('Enter room name:');
    if (newRoomName) {
      setRoomName(newRoomName);
      fetchToken(newRoomName);
      setIsRoomCreated(true);
    }
  };

  const handleJoinRoom = () => {
    const existingRoomName = prompt('Enter the room name to join:');
    if (existingRoomName) {
      setRoomName(existingRoomName);
      fetchToken(existingRoomName);
      setIsRoomCreated(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageInput = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
    if (messageInput.value) {
      setMessages((prev) => [...prev, { sender: participantName, message: messageInput.value }]);
      messageInput.value = ''; // Clear input field
    }
  };

  if (!isRoomCreated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-3xl font-bold mb-8">Welcome to the Doctor-Patient Session</h1>
        <div className="space-x-4">
          <button onClick={handleCreateRoom} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Create Room
          </button>
          <button onClick={handleJoinRoom} className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Join Room
          </button>
        </div>
      </div>
    );
  }

  if (!token) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen flex flex-col">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        className="flex-grow flex-shrink-0"
        style={{ height: '100%' }}
        data-lk-theme="default"
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}
