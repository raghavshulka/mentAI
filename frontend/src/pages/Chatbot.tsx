import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!message) return;
    setLoading(true);
    setError(null);
    setReply(null);

    try {
      const response = await axios.post('/api/v1/chatbot/chat', { message });
      setReply(response.data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('An error occurred while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        ></textarea>
        <button
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {reply && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-lg">AI Reply:</h2>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
