export type GpsCoordinate = {
  latitude: number
  longitude: number
  altitude: number
}

export type LineString = {
  coordinate: GpsCoordinate
  time: string
}

export type GpsFeature = {
  name: string
  lineString: LineString[]
}

export type GpsLog = {
  features: GpsFeature[]
}