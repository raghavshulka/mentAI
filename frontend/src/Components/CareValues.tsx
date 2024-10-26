import React from 'react'
import { Activity, Brain, Stethoscope } from 'lucide-react'

const CareValues: React.FC = () => {
  return (
    <div className="bg-gradient-to-b relative from-blue-50 to-white min-h-screen flex flex-col justify-center items-center px-4 py-16 mb-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-sm uppercase tracking-wider mb-4 text-blue-600 font-semibold">OUR VALUES</h2>
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-gray-800">
          Empowering Healthcare<br className="hidden md:inline" /> Through Innovation
        </h1>
        <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600">
          We believe in leveraging cutting-edge technology to enhance patient care, streamline operations, and improve overall health outcomes.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <ValueCard
            icon={<Activity className="w-8 h-8 text-blue-500" />}
            title="Data-Driven Insights"
            description="Our advanced analytics provide actionable insights, enabling proactive care strategies and informed decision-making for better patient outcomes."
          />
          <ValueCard
            icon={<Stethoscope className="w-8 h-8 text-green-500" />}
            title="User-Centric Design"
            description="Intuitive interfaces and streamlined workflows allow healthcare professionals to focus more on patient care and less on navigating complex systems."
          />
          <ValueCard
            icon={<Brain className="w-8 h-8 text-purple-500" />}
            title="AI-Assisted Diagnostics"
            description="Cutting-edge machine learning algorithms assist in early detection and diagnosis, supporting healthcare providers in delivering precise and timely care."
          />
        </div>
      </div>
    </div>
  )
}

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3 text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default CareValues