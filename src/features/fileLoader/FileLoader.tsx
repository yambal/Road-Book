import React from 'react'
import { gpxToGeoJson } from './gpxToGeoJson';
import { GpsCoordinate, GpsFeature, GpsLog, LineString } from '../../models/GpsJson';
import { useAppDispatch } from '../../app/hooks';
import { set as setGpsJson } from './GpsJsonSlice'
import { set as setCurrentFeatureId } from '../mapView/gpsLogViewSlice'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid';

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

          const geometry = feature.geometry
          // const geometryType = geometry.type
          /* @ts-ignore */
          const coordinates = geometry.coordinates
          const geometryType = geometry.type

          let gpsCoordinates: GpsCoordinate[] = []
          let gpsTimes: number[] = []
          let lineStrings: LineString[] | undefined = undefined
          let gpsCoordinate: GpsCoordinate | undefined = undefined

          if (geometryType === "LineString") {
            /**
             * latitude 緯度 / 北緯
             * longitude 経度 / 東経
             */
            /* @ts-ignore  */
            gpsCoordinates = coordinates.map(coordinate => {
              const gpsCoordinate: GpsCoordinate = {
                longitude: coordinate[0],
                latitude: coordinate[1],
                altitude: coordinate[2]
              }
              return gpsCoordinate
            })

            const times: number[] = coordinateProperties?.times || []
            gpsTimes = times.map((time) => {
              return Math.floor(new Date(time).getTime() / 1000)
            })

            lineStrings = gpsCoordinates.map((gpsCoordinate, index) => {
              const lineString: LineString = {
                coordinate: gpsCoordinate,
                time: gpsTimes[index]
              }
              return lineString
            })
          } else {
            gpsCoordinate = {
              longitude: coordinates[0],
              latitude: coordinates[1],
              altitude: coordinates[2]
            }
            console.log("gpsCoordinate", gpsCoordinate)
          }

          const id = uuidv4()

          const gpsFeature: GpsFeature = {
            name,
            id,
            geometryType,
            lineString: lineStrings,
            coordinate: gpsCoordinate
          }

          console.log(`${name}: ${geometryType} / ${type}`, gpsFeature)

          return gpsFeature
        })

        const gpsLog: GpsLog = {
          features: gpsFeartures
        }
        dispatch(setGpsJson(gpsLog))
        dispatch(setCurrentFeatureId(gpsLog.features[0].id))

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