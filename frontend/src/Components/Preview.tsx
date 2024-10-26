import React, { useEffect, useRef } from 'react';
import { FaRobot, FaFacebookMessenger, FaWhatsapp, FaComments, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { SiIcloud } from 'react-icons/si';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      gsap.fromTo(container, { y: 100, opacity: 0 }, { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%', // Adjust this to control when the animation starts
          toggleActions: 'play none none reverse' // Play on enter, reverse on leave
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="text-center">
          <FaRobot className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Meet your patients where they are
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Our suite of communication tools helps you connect with patients the way they already connect with friends and family. A unified inbox and intelligent automation lets your team save time while increasing the frequency and impact of patient interactions.
          </p>
        </div>

        <div className="mt-16 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
          <ChatInterface left={true} />
          <div className="flex flex-col space-y-4">
            <FaFacebookMessenger className="w-8 h-8 text-blue-500" />
            <FaWhatsapp className="w-8 h-8 text-green-500" />
            <SiIcloud className="w-8 h-8 text-blue-300" />
            <FaEnvelope className="w-8 h-8 text-red-500" />
            <FaComments className="w-8 h-8 text-gray-500" />
            <FaTwitter className="w-8 h-8 text-blue-400" />
          </div>
          <ChatInterface left={false} />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -z-10 opacity-50" />
    </div>
  );
};

interface ChatInterfaceProps {
  left: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ left }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg w-full max-w-sm ${left ? 'lg:mr-4' : 'lg:ml-4'}`}>
      <div className="border-b border-gray-200 px-4 py-2 flex items-center">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="ml-2 text-gray-700 font-medium">Lee Janis</span>
      </div>
      <div className="p-4 space-y-4">
        <ChatMessage sender="doctor" message={left ? "Hi, Lee! Will you need help getting to your appointment tomorrow?" : "Hi, Lee! Will you need help getting to your appointment tomorrow?"} />
        <ChatMessage sender="patient" message={left ? "Yes, please! My caretaker is away and I wasn't sure how I would get to you." : "Yes, please! My caretaker is away and I wasn't sure how I would get to you."} />
        <ChatMessage sender="doctor" message={left ? "Perfect! I've arranged for a taxi to pick you up. Your driver is Denise. Please contact me if you have any trouble." : "Perfect! I've arranged for a taxi to pick you up. Your driver is Denise. Please contact me if you have any trouble."} />
        <ChatMessage sender="patient" message={left ? "Thanks!" : "Thanks!"} />
      </div>
      <div className="border-t border-gray-200 px-4 py-2 flex justify-between items-center">
        <span className="text-gray-500">My pleasure!</span>
        {left ? (
          <button className="bg-green-500 text-white px-4 py-1 rounded">Send</button>
        ) : (
          <div className="flex space-x-2">
            <span className="text-gray-400">😊</span>
            <span className="text-gray-400">📎</span>
            <span className="text-gray-400">📷</span>
            <span className="text-gray-400">🎤</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface ChatMessageProps {
  sender: 'doctor' | 'patient';
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message }) => {
  return (
    <div className={`flex ${sender === 'doctor' ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${sender === 'doctor' ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'}`}>
        {message}
      </div>
    </div>
  );
};

export default LandingPage;
