import { gpxStringToGeoJson } from "./gpxStringToGeoJson"
import { GpsLogFeature, GpsLog, PolylineCoordunate } from '../../../models/GpsJson'
import { LatLng, latLng } from "leaflet"
import { v4 as uuidv4 } from 'uuid';

export const geoJsonStringToGpsLog = (geoJsonText: string) => {
  const geoJson = gpxStringToGeoJson(String(geoJsonText))

  console.log(geoJson)

  const gpsFeartures = geoJson.features.map((feature) => {
    const properties = feature.properties
    const coordinateProperties = properties?.coordinateProperties || undefined
    const name = properties?.name || 'un named'
    const propertyType = String(properties?.type) || undefined

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
    }

    const id = uuidv4()

    const gpsFeature: GpsLogFeature = {
      name,
      id,
      propertyType,
      geometryType,
      polylineCoordinates: lineStrings,
      coordinate: gpsCoordinate
    }
    return gpsFeature
  })

  const gpsLog: GpsLog = {
    features: gpsFeartures
  }

  return gpsLog
}