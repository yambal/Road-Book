import React from 'react'
import { gpxToGeoJson } from './gpxToGeoJson';
import { GpsCoordinate, GpsFeature, GpsLog, LineString } from '../../models/GpsJson';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { set } from './GpsJsonSlice'

export const FileLoader = () => {
  const dispatch = useAppDispatch()
  
  const fileChangeHandle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files?.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const readedText = reader.result
        const geoJson = gpxToGeoJson(String(readedText))
        
        const gpsFeartures = geoJson.features.map((feature) => {
          const properties = feature.properties
          const coordinateProperties = properties?.coordinateProperties
          const name = properties?.name
          const times = coordinateProperties.times

          const geometry = feature.geometry
          // const geometryType = geometry.type
          /* @ts-ignore */
          const coordinates = geometry.coordinates

          /* @ts-ignore  */
          const gpsCoordinates: GpsCoordinate[] = coordinates.map(coordinate => {
            const gpsCoordinate: GpsCoordinate = {
              latitude: coordinate[0],
              longitude: coordinate[1],
              altitude: coordinate[2]
            }
            return gpsCoordinate
          })

          const lineStrings = gpsCoordinates.map((gpsCoordinate, index) => {
            const lineString: LineString = {
              coordinate: gpsCoordinate,
              time: times[index]
            }
            return lineString
          })

          const gpsFeature: GpsFeature = {
            name,
            lineString: lineStrings
          }

          return gpsFeature
        })

        const gpsLog: GpsLog = {
          features: gpsFeartures
        }
        console.log(gpsLog)
        dispatch(set(gpsLog))
      }
      reader.readAsText(file)
    }

    
  }, [])

  return (
    <div>
      <input type="file" onChange={fileChangeHandle}/>
    </div>
  )
}