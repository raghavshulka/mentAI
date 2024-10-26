import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

interface Message {
  id: number;
  bookingId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

interface BookingDetails {
  bookingId: number;
  senderId: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  // Fetch booking details first
  // useEffect(() => {
  //   const fetchBookingDetails = async () => {
  //     try {
  //       const response = await axios.get<BookingDetails>(
  //         `${process.env.NEXT_PUBLIC_API_URL}/bookings/123` // Replace with actual userId
  //       );
  //       setBookingDetails(response.data);
  //       setError(null);
  //     } catch (error) {
  //       console.error('Error fetching booking details:', error);
  //       setError('Failed to load booking details');
  //     }
  //   };

  //   fetchBookingDetails();
  // }, []);

  // Fetch initial messages after booking details are loaded
  useEffect(() => {
    if (!bookingDetails) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Message[]>(
          `http://localhost:3000/bookings/${'id dalio'}`
        );
        setMessages(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [bookingDetails]);

  // Set up Pusher for real-time messaging
  useEffect(() => {
    if (!bookingDetails) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      // useTLS: true,
    });

    const channel = pusher.subscribe('chat');

    channel.bind('message', (newMessage: Message) => {
      if (newMessage.bookingId === bookingDetails.bookingId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [bookingDetails]);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !bookingDetails) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        bookingId: bookingDetails.bookingId,
        senderId: bookingDetails.senderId,
        content: message.trim(),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  // Loading state
  if (!bookingDetails || isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px] bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-lg shadow-md">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === bookingDetails.senderId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === bookingDetails.senderId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="break-words">{msg.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 bg-white rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;


// // Chat page wrapper
// const ChatPage = () => {
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-2xl font-bold mb-6">Chat</h1>
//       <Chat bookingId={1} senderId={123} /> {/* Replace with actual IDs */}
//     </div>
//   );
// };

// export default ChatPage;
