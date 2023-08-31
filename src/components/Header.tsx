import React from "react"

import { AppBar, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
  headerTitle: React.ReactNode
  drawerWidth: number
  onMenuClick: () => void
}

export const Header = ({
  headerTitle,
  drawerWidth,
  onMenuClick
}: HeaderProps) => {
  
  return (
    <AppBar
      position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      <Toolbar>
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        {headerTitle}
      </Toolbar>
    </AppBar>
  )
}