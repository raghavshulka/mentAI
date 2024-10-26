// components/ui/Separator.tsx
import React from 'react'

interface SeparatorProps {
  className?: string
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return <hr className={`border-t border-gray-300 ${className}`} />
}
