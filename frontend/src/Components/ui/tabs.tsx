import React, { useState } from 'react'

interface Tab {
  label: string
  content: React.ReactNode
}

interface CustomTabsProps {
  tabs: Tab[]
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      <div className="flex mb-4 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 transition-all duration-300 ${
              activeTab === index
                ? 'border-b-2 border-primary text-primary font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default CustomTabs
