import { LatLng } from "leaflet"

export type GometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection"

export type LineString = {
  coordinate: LatLng
  time: number | undefined
}

export type GpsFeature = {
  name: string
  id: string
  geometryType: GometryType
  lineString: LineString[] | undefined
  coordinate: LatLng | undefined
}

export type GpsLog = {
  features: GpsFeature[]
}