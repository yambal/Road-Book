import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Toolbar } from "@mui/material"
import { useAppSelector } from '../../app/hooks'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderIcon from '@mui/icons-material/Folder';

export const DrawerLogview = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsJson.features)
  return (
    <>
      <Toolbar />
      <List>
      {gpsLogFeatures.map((feature, index) => {
        let timeText = ''
        const start = feature.lineString[0].time || undefined
        const end = feature.lineString[feature.lineString.length - 1].time || undefined
        if(start && end) {
          const startTimeDate = new Date(start)
          const endTimeDate = new Date(end)

          const startTimeDay = dayjs(startTimeDate)
          const endTimeDay = dayjs(endTimeDate)

          const diffHour = Math.floor(endTimeDay.diff(startTimeDay) / 3600000)
          const diffMin = Math.floor(Math.floor(endTimeDay.diff(startTimeDay) % 3600000) / 60000)
          timeText = `${diffHour}時間${diffMin}分`
        }

        /**
         *             {index}:{feature.name}<br />
            {startTimeDay.format('YYYY-MM-DD HH:mm:ss')}<br />
            {endTimeDay.format('YYYY-MM-DD HH:mm:ss')}<br />
            {`${diffHour}時間${diffMin}分`}
         */
        return (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={feature.name} secondary={timeText} />
          </ListItem>
        )
      }, [])}
      </List>
    </>
  )
}