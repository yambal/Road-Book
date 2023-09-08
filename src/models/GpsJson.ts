export type GometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection"

export type GpsLogLatLng = {
  lat: number
  lng: number
  alt?: number
}

export type PolylineCoordunate = {
  coordinate: GpsLogLatLng
  time: number | undefined
}

export type GpsLogFeature = {
  name: string
  desc: string | undefined
  id: string
  propertyType: string | undefined
  geometryType: GometryType
  polylineCoordinates: PolylineCoordunate[] | undefined
  coordinate: GpsLogLatLng | undefined
}

export type GpsLog = {
  features: GpsLogFeature[]
}