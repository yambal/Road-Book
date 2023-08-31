import React from 'react'
import { gpxToGeoJson } from './gpxToGeoJson';
import { GpsCoordinate, GpsFeature, GpsLog, LineString } from '../../models/GpsJson';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { set } from './GpsJsonSlice'
import { useNavigate } from 'react-router';

export const FileLoader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const fileChangeHandle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files?.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const readedText = reader.result
        const geoJson = gpxToGeoJson(String(readedText))
        console.log(geoJson)

        const gpsFeartures = geoJson.features.map((feature) => {
          const properties = feature.properties
          const coordinateProperties = properties?.coordinateProperties || undefined
          const name = properties?.name || 'un named'
          const type = properties?.type || undefined

          

          const times = coordinateProperties?.times || []

          const geometry = feature.geometry
          // const geometryType = geometry.type
          /* @ts-ignore */
          const coordinates = geometry.coordinates
          const geometryType = geometry.type

          console.log(geometryType)
          console.log(`${name}: ${geometryType} / ${type}`)

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
              time: times[index] ? Math.floor(new Date(times[index]).getTime()) : undefined
            }
            return lineString
          })

          const gpsFeature: GpsFeature = {
            name,
            geometryType,
            lineString: lineStrings
          }

          return gpsFeature
        })

        const gpsLog: GpsLog = {
          features: gpsFeartures
        }
        dispatch(set(gpsLog))

        console.log(gpsLog)

        navigate('logView')
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