import React from 'react'
import { GpsFeature } from "../../../models/GpsJson"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material"
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { GeometryIcon } from './GeometryIcon'

export type MapGpsLogListItemProps = {
  gpsFeature: GpsFeature,
  onClick: (featureId: string | undefined) => void
}

export const MapGpsLogListItem = ({
  gpsFeature,
  onClick
}: MapGpsLogListItemProps) => {
  const timeText = React.useMemo(() => {
    let text = ''
    if (gpsFeature.lineString) {
      const start = gpsFeature.lineString[0].time || undefined
      const end = gpsFeature.lineString[gpsFeature.lineString.length - 1].time || undefined
      if(start && end) {
        const startTimeDate = new Date(start * 1000)
        const endTimeDate = new Date(end * 1000)
        const startTimeDay = dayjs(startTimeDate)
        const endTimeDay = dayjs(endTimeDate)
        const diffHour = Math.floor(endTimeDay.diff(startTimeDay) / 3600000)
        const diffMin = Math.floor(Math.floor(endTimeDay.diff(startTimeDay) % 3600000) / 60000)
        text = `${diffHour}時間${diffMin}分`
      }
    }
    return text
  }, [gpsFeature])

  const handleListItemClick = React.useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    const li = event.currentTarget
    const id = li.dataset.id
    onClick(id)
  }, [onClick])

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
      onClick={handleListItemClick}
      data-id={gpsFeature.id}
    >
      <ListItemAvatar>
        <Avatar>
          <GeometryIcon geometryType={gpsFeature.geometryType}/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={gpsFeature.name} secondary={`${gpsFeature.geometryType}: ${timeText}`} />
    </ListItem>
  )
}