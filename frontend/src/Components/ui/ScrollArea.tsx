// components/ui/ScrollArea.tsx
import React from 'react'

interface ScrollAreaProps {
  className?: string
  children: React.ReactNode
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children }) => {
  return (
    <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${className}`}>
      {children}
    </div>
  )
}
