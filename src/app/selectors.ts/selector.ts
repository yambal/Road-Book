import { LatLngExpression } from "leaflet";
import { useAppSelector } from "../hooks";

export const useGpsLogFeatures = () => useAppSelector(state => state.gpsJson.features)

export const useLineStringGpsLogFeatures = () => {
  const gpsLogFeatures = useGpsLogFeatures()
  return gpsLogFeatures.filter((f) => {
    return f.geometryType === "LineString"
  })
}

export const usePointGpsLogFeatures = () => {
  const gpsLogFeatures = useGpsLogFeatures()
  return gpsLogFeatures.filter((f) => {
    return f.geometryType === "Point"
  })
}

export const useGpsLogPolylines = () => {
  const lineStringGpsLogFeatures = useLineStringGpsLogFeatures()

  if (lineStringGpsLogFeatures.length > 0) {
    return lineStringGpsLogFeatures.map((f) => {
      if (f.lineString) {
        return f.lineString.map(ls => {
          const latlan: LatLngExpression = [ 
            ls.coordinate.longitude,
            ls.coordinate.latitude,
          ]
          return latlan
        })
      }
      return []
    })
  }
  return []
}
