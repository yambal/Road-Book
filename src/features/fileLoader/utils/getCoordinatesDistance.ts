import { getPreciseDistance } from "geolib";
import { GpsLogLatLng } from "../../../models/GpsJson";

export type DistanceResult = {
  distanceFromStart: number
  distance: number
}

export const getCoordinatesDistance = (gpsCoordinates: GpsLogLatLng[]) => {
  let distanceFromStart = 0
  return gpsCoordinates.map((gpsLogLatLng, index, gpsLogLanLons) => {
    let res: DistanceResult = {
      distanceFromStart: 0,
      distance: 0
    }

    if (index === 0) {
      res = {
        distanceFromStart: 0,
        distance: 0
      }
    } else {
      const beforeGpsCoordinates = gpsLogLanLons[index - 1]
      const distance = getPreciseDistance(
        {lat: beforeGpsCoordinates.lat, lng: beforeGpsCoordinates.lng},
        {lat: gpsLogLatLng.lat, lng: gpsLogLatLng.lng},
        0.01
      )
      distanceFromStart += distance
      res = {
        distance,
        distanceFromStart
      }
    }
    return res
  })
}