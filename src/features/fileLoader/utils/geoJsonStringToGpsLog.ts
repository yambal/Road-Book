import { gpxStringToGeoJson } from "./gpxStringToGeoJson"
import { GpsLogFeature, GpsLog, PolylineCoordunate, GpsLogLatLng } from '../../../models/GpsJson'
import { v4 as uuidv4 } from 'uuid';
import { gpsLogLatLngFromNum } from "./latLng";
import { getPreciseDistance } from 'geolib'
import { GeolibInputCoordinates, GeolibInputCoordinatesWithTime, GeolibLongitudeInputValue } from "geolib/es/types";

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

      const a = gpsCoordinates.map((coordinate, index) => {
        if (index === 0) {
          return 0
        }
        const beforeCoordinate = gpsCoordinates[index - 1]
        return getPreciseDistance({lat: beforeCoordinate.lat, lng: beforeCoordinate.lng}, {lat: coordinate.lat, lng: coordinate.lng}, 0.1)
      })
      console.log('distance', a)

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