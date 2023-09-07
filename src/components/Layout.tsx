import React from "react"
import {} from '@emotion/react/types/css-prop'

import Box from '@mui/material/Box'

import { Header } from "../components/Header"
import { Drawer } from "@mui/material"
import { useDrawer } from '../hooks/useDrawer'
import Typography from '@mui/material/Typography'
import { Toolbar } from "@mui/material"

/**
 * Drawer
 * https://mui.com/material-ui/react-drawer/#responsive-drawer
 */

type LayoutProps = {
  drawerContents: React.ReactNode
  children: React.ReactNode
  drawerWidth: number
}

export const Layout = ({
  drawerContents,
  children,
  drawerWidth
}: LayoutProps) => {

  const { isOpen, toggle, close } = useDrawer()

  return (
      <Box sx={{
        display: 'flex',
        height: '100%'
      }}>
        <Header
          drawerWidth={drawerWidth}
          onMenuClick={toggle}
          headerTitle={
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Hi
            </Typography>
          }
        />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            anchor='left'
            open={isOpen}
            onClose={close}
            variant="temporary"
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawerContents}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawerContents}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar />
          <div style={{
            flexGrow: 1
          }}>
            {children}
          </div>
        </Box>
      </Box>
  )
}