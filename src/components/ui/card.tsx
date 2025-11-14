"use client"

import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}