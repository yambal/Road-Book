import React from 'react'

import { List, Toolbar } from "@mui/material"
import { useAppSelector } from '../../../app/hooks'
import { MapGpsLogListItem } from "./MapGpsLogListItem"
import { useAppDispatch } from '../../../app/hooks'
import { setCenter, setCurrentFeatureId } from '../gpsLogViewSlice'
import { useGpsLogViewCurrentFeatureId } from '../../../app/selectors.ts/selector'
import { deleteFunction } from '../../fileLoader/gpsLogSlice'
import { GpsLogFeature } from '../../../models/GpsJson'

export const DrawerLogview = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsLog.features)
  const dispatch = useAppDispatch()
  const gpsLogViewCurrentFeatureId = useGpsLogViewCurrentFeatureId()

  const handleListItemClick = React.useCallback((featureId: string | undefined) => {
    dispatch(setCenter(undefined))
    dispatch(setCurrentFeatureId(featureId))
  }, [dispatch])

  const handleDelete = React.useCallback((targetFeature: GpsLogFeature) => {
    let deletFeatureIndex: number = 0
    let nextCurrentFeatureIndex: number = 0
    gpsLogFeatures.forEach((feature, index) => {
      if (feature.id === targetFeature.id) {
        deletFeatureIndex = index
      }
    })

    if (gpsLogFeatures.length > deletFeatureIndex + 1) {
      nextCurrentFeatureIndex = deletFeatureIndex + 1
    } else if (deletFeatureIndex > 0) {
      nextCurrentFeatureIndex = deletFeatureIndex - 1
    }

    const nextId = gpsLogFeatures[nextCurrentFeatureIndex].id

    dispatch(setCurrentFeatureId(nextId))
    dispatch(deleteFunction({targetFeature}))
    
  }, [dispatch, gpsLogFeatures])

  return (
    <>
      <Toolbar />
      <List>
      {gpsLogFeatures.map((feature, index) => {
        const selected = feature.id === gpsLogViewCurrentFeatureId
        return (
          <MapGpsLogListItem
            gpsFeature={feature}
            key={index}
            onClick={handleListItemClick}
            selected={selected}
            onDelete={handleDelete}
          />
        )
      })}
      </List>
    </>
  )
}