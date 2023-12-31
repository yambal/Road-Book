import React from 'react'
import { GpsLogFeature } from "../../../models/GpsJson"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material"
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { GeometryIcon } from './GeometryIcon'

export type MapGpsLogListItemProps = {
  gpsFeature: GpsLogFeature,
  selected: boolean | undefined
  onClick: (featureId: string | undefined) => void,
  onDelete: (featureId: GpsLogFeature) => void,
}

export const MapGpsLogListItem = ({
  gpsFeature,
  selected = false,
  onClick,
  onDelete,
}: MapGpsLogListItemProps) => {
  const timeText = React.useMemo(() => {
    let text = ''
    if (gpsFeature.polylineCoordinates) {
      const start = gpsFeature.polylineCoordinates[0].time || undefined
      const end = gpsFeature.polylineCoordinates[gpsFeature.polylineCoordinates.length - 1].time || undefined
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

  const handleListItemClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const li = event.currentTarget
    const id = li.dataset.id
    onClick(id)
  }, [onClick])

  const deleteHandle = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(gpsFeature)
  }, [gpsFeature, onDelete])

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={deleteHandle}>
          <DeleteIcon />
        </IconButton>
      }
      selected={selected}
      disablePadding
    >
      <ListItemButton data-id={gpsFeature.id} onClick={handleListItemClick}>
        <ListItemAvatar>
          <Avatar>
            <GeometryIcon geometryType={gpsFeature.geometryType}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={gpsFeature.name}
          secondary={`${gpsFeature.desc}: ${timeText}`}
        />
      </ListItemButton>
    </ListItem>
  )
}