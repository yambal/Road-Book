import { LatLng } from "leaflet"

export type GometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection"

export type PolylineCoordunate = {
  coordinate: LatLng
  time: number | undefined
}

export type GpsLogFeature = {
  name: string
  desc: string | undefined
  id: string
  propertyType: string | undefined
  geometryType: GometryType
  polylineCoordinates: PolylineCoordunate[] | undefined
  coordinate: LatLng | undefined
}

export type GpsLog = {
  features: GpsLogFeature[]
}