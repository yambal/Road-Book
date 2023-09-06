import React from 'react'
import { gpxToGeoJson } from './gpxToGeoJson';
import { GpsLogFeature, GpsLog, PolylineCoordunate } from '../../models/GpsJson';
import { useAppDispatch } from '../../app/hooks';
import { set as setGpsJson } from './GpsJsonSlice'
import { set as setCurrentFeatureId } from '../mapView/gpsLogViewSlice'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid';
import { LatLng, latLng } from 'leaflet';

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

          let gpsCoordinates: LatLng[] = []
          let gpsTimes: number[] = []
          let lineStrings: PolylineCoordunate[] | undefined = undefined
          let gpsCoordinate: LatLng | undefined = undefined

          if (geometryType === "LineString") {
            /**
             * latitude 緯度 / 北緯
             * longitude 経度 / 東経
             */
            /* @ts-ignore  */
            gpsCoordinates = coordinates.map(coordinate => {
              return latLng(coordinate[1], coordinate[0], coordinate[2])
            })

            const times: number[] = coordinateProperties?.times || []
            gpsTimes = times.map((time) => {
              return Math.floor(new Date(time).getTime() / 1000)
            })

            lineStrings = gpsCoordinates.map((gpsCoordinate, index) => {
              const lineString: PolylineCoordunate = {
                coordinate: gpsCoordinate,
                time: gpsTimes[index]
              }
              return lineString
            })
          } else {
            gpsCoordinate = latLng(coordinates[1], coordinates[0], coordinates[2])
            console.log("gpsCoordinate", gpsCoordinate)
          }

          const id = uuidv4()

          const gpsFeature: GpsLogFeature = {
            name,
            id,
            geometryType,
            polylineCoordinates: lineStrings,
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