export type GpsCoordinate = {
  latitude: number
  longitude: number
  altitude: number
}

export type GometryType = "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection"

export type LineString = {
  coordinate: GpsCoordinate
  time: number | undefined
}

export type GpsFeature = {
  name: string
  geometryType: GometryType
  lineString: LineString[] | undefined
  coordinate: GpsCoordinate | undefined
}

export type GpsLog = {
  features: GpsFeature[]
}