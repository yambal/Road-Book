import React from 'react'

import { List, Toolbar } from "@mui/material"
import { useAppSelector } from '../../../app/hooks'
import { MapGpsLogListItem } from "./MapGpsLogListItem"
import { useAppDispatch } from '../../../app/hooks'
import { setCenter, setCurrentFeatureId } from '../gpsLogViewSlice'
import { useGpsLogViewCurrentFeatureId } from '../../../app/selectors.ts/selector'

export const DrawerLogview = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsLog.features)
  const dispatch = useAppDispatch()
  const gpsLogViewCurrentFeatureId = useGpsLogViewCurrentFeatureId()

  const handleListItemClick = React.useCallback((featureId: string | undefined) => {
    dispatch(setCenter(undefined))
    dispatch(setCurrentFeatureId(featureId))
  }, [dispatch])

  return (
    <>
      <Toolbar />
      <List>
      {gpsLogFeatures.map((feature, index) => {
        const selected = feature.id === gpsLogViewCurrentFeatureId
        return (
          <MapGpsLogListItem gpsFeature={feature} key={index} onClick={handleListItemClick} selected={selected}/>
        )
      })}
      </List>
    </>
  )
}