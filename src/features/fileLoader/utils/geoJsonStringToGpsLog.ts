import { gpxStringToGeoJson } from "./gpxStringToGeoJson"
import { GpsLogFeature, GpsLog, PolylineCoordunate } from '../../../models/GpsJson'
import { LatLng, latLng } from "leaflet"
import { v4 as uuidv4 } from 'uuid';

export const geoJsonStringToGpsLog = (geoJsonText: string) => {
  const geoJson = gpxStringToGeoJson(String(geoJsonText))

  console.log(geoJson)

  const gpsFeartures = geoJson.features.map((feature) => {
    const {
      coordinateProperties = undefined,
      name = "un named",
      desc = undefined,
      type:propertyType = undefined
    } = feature.properties || {}

    const {
      times: coordinatePropertyTimes = []
    } = coordinateProperties || {}

    const {
      /* @ts-ignore */
      coordinates = [],
      type: geometryType,
    } = feature.geometry || []

    let gpsCoordinates: LatLng[] = []
    let gpsTimes: number[] = []
    let polylineCoordinates: PolylineCoordunate[] | undefined
    let gpsCoordinate: LatLng | undefined

    if (geometryType === "LineString") {
      /**
       * latitude 緯度 / 北緯
       * longitude 経度 / 東経
       */
      /* @ts-ignore  */
      gpsCoordinates = coordinates.map(coordinate => {
        return latLng(coordinate[1], coordinate[0], coordinate[2])
      })

      const times: number[] = coordinatePropertyTimes
      gpsTimes = times.map((time) => {
        return Math.floor(new Date(time).getTime() / 1000)
      })

      polylineCoordinates = gpsCoordinates.map((gpsCoordinate, index) => {
        const polylineCoordunate: PolylineCoordunate = {
          coordinate: gpsCoordinate,
          time: gpsTimes[index]
        }
        return polylineCoordunate
      })
    } else {
      gpsCoordinate = latLng(coordinates[1], coordinates[0], coordinates[2])
    }

    const id = uuidv4()

    const gpsFeature: GpsLogFeature = {
      name,
      desc,
      id,
      propertyType,
      geometryType,
      polylineCoordinates,
      coordinate: gpsCoordinate
    }
    return gpsFeature
  })

  const gpsLog: GpsLog = {
    features: gpsFeartures
  }

  return gpsLog
}