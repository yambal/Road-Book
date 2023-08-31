import React from "react"

type DrawerState = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const defaultState:DrawerState = {
  isOpen: false,
  toggle: () => {},
  close: () => {}
}

export const DrawerContext = React.createContext(defaultState)

export const useDrawer = ():DrawerState => {
  return React.useContext(DrawerContext)
}