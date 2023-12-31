import { gpxStringToGeoJson } from "./gpxStringToGeoJson"
import { GpsLogFeature, GpsLog, PolylineCoordunate, GpsLogLatLng } from '../../../models/GpsJson'
import { v4 as uuidv4 } from 'uuid';
import { gpsLogLatLngFromNum } from "./latLng";
import { getCoordinatesDistance } from "./getCoordinatesDistance";

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

    let gpsCoordinates: GpsLogLatLng[] = []
    let gpsTimes: number[] = []
    let polylineCoordinates: PolylineCoordunate[] | undefined
    let gpsCoordinate: GpsLogLatLng | undefined

    if (geometryType === "LineString") {
      /**
       * latitude 緯度 / 北緯
       * longitude 経度 / 東経
       */
      /* @ts-ignore  */
      gpsCoordinates = coordinates.map(coordinate => {
        return gpsLogLatLngFromNum(coordinate[1], coordinate[0], coordinate[2])
      })

      const coordinatesDistance = getCoordinatesDistance(gpsCoordinates)

      const times: number[] = coordinatePropertyTimes
      gpsTimes = times.map((time) => {
        return Math.floor(new Date(time).getTime() / 1000)
      })

      const kmh = gpsTimes.map((time, index, times) => {
        if (index === 0) {
          return 0
        }
        const beforeTime = times[index - 1]
        const h = 3600 / (time - beforeTime) * coordinatesDistance[index].distance
        return Math.round(h / 1000)
      })
      console.log(kmh)

      polylineCoordinates = gpsCoordinates.map((gpsCoordinate, index) => {
        const polylineCoordunate: PolylineCoordunate = {
          coordinate: gpsCoordinate,
          time: gpsTimes[index],
          distance: coordinatesDistance[index].distance,
          distanceFromStart: coordinatesDistance[index].distanceFromStart,
          speed: kmh[index]
        }
        return polylineCoordunate
      })
    } else {
      gpsCoordinate = gpsLogLatLngFromNum(coordinates[1], coordinates[0], coordinates[2])
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