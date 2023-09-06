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
      if (f.polylineCoordinates) {
        return  f.polylineCoordinates.map(ls => {
          const lle: LatLngExpression = {
            lat: ls.coordinate.lat,
            lng: ls.coordinate.lng
          }
          return lle
        })
      }
      return []
    })
  }
  return []
}

/**
 * 
 */

export const useGpsLogView = () => useAppSelector(state => state.gpsLogView)
export const useGpsLogViewCurrentFeatureId = () => {
  const gpsLogFeatures = useGpsLogView()
  return gpsLogFeatures.currentFeatureId
}

export const useGpsLogViewCurrentFeature = () => {
  const gpsLogViewCurrentFeatureId = useGpsLogViewCurrentFeatureId()
  const gpsLogFeatures = useGpsLogFeatures()
  return gpsLogFeatures.find((gpsLogFeature) => {
    return gpsLogFeature.id === gpsLogViewCurrentFeatureId
  })
}