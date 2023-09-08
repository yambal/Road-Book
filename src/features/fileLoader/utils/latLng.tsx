import { latLng } from "leaflet"
import { GpsLogLatLng } from "../../../models/GpsJson"

export const gpsLogLatLngFromNum = (lat: number, lng: number, alt?: number) => {
  const res: GpsLogLatLng = {
    lat,
    lng,
    alt
  }
  return res
}

export const latLngFromGpsLogLatLng = (gpsLogLatLng: GpsLogLatLng) => {
  return latLng({
    lat: gpsLogLatLng.lat,
    lng: gpsLogLatLng.lng,
    alt: gpsLogLatLng.alt
  })
}