import { LatLng } from "leaflet"

export type GometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection"

export type PolylineCoordunate = {
  coordinate: LatLng
  time: number | undefined
}

export type GpsLogFeature = {
  name: string
  id: string
  geometryType: GometryType
  polylineCoordinates: PolylineCoordunate[] | undefined
  coordinate: LatLng | undefined
}

export type GpsLog = {
  features: GpsLogFeature[]
}