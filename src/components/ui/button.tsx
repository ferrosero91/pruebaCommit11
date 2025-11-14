"use client"

import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
}

export function Button({ 
  children, 
  onClick, 
  variant = "default", 
  size = "md", 
  className = "",
  href
}: ButtonProps) {
  const baseClasses = "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  if (href) {
    return (
      <NavLink to={href} className={classes}>
        {children}
      </NavLink>
    )
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}