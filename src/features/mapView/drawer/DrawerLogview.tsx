import React from 'react'

import { List, Toolbar } from "@mui/material"
import { useAppSelector } from '../../../app/hooks'
import { MapGpsLogListItem } from "./MapGpsLogListItem"
import { useAppDispatch } from '../../../app/hooks'
import { set } from '../gpsLogViewSlice'

export const DrawerLogview = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsJson.features)
  const dispatch = useAppDispatch()

  const handleListItemClick = React.useCallback((featureId: string | undefined) => {
    console.log(featureId)
    dispatch(set(featureId))
  }, [])

  return (
    <>
      <Toolbar />
      <List>
      {gpsLogFeatures.map((feature, index) => {
        return (
          <MapGpsLogListItem gpsFeature={feature} key={index} onClick={handleListItemClick}/>
        )
      })}
      </List>
    </>
  )
}