import React from "react"
import { DrawerContext, defaultState } from '../hooks/useDrawer'

type DrawerProviderProps = {
  children: React.ReactNode
}

export const DrawerProvider = ({children}: DrawerProviderProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultState.isOpen)

  const value = {
    isOpen,
    toggle: () => {
      setIsOpen(!isOpen)
    },
    close: () => {
      setIsOpen(false)
    }
  }

  return (
    <DrawerContext.Provider value={value}>
      { children }
    </DrawerContext.Provider>
  )
}