import { LatLngExpression } from "leaflet"
import { useGpsLogViewCurrentFeatureId, usePointGpsLogFeatures } from "../../../../app/selectors.ts/selector"
import { PointMaker } from "./PointMaker"


export const PointsView = () => {
  const pointFeature = usePointGpsLogFeatures()
  const gpsLogViewCurrentFeatureId = useGpsLogViewCurrentFeatureId()
  return (
    <>
      {
        pointFeature.map((f) => {
          const isCurrent = f.id === gpsLogViewCurrentFeatureId
          if (f.coordinate) {
            const p:LatLngExpression = {
              lng:f.coordinate.longitude,
              lat:f.coordinate?.latitude
            }
            return (
              <PointMaker latLang={p} opacity={isCurrent ? 1 : 0.5}/>
            )
          }
          return undefined
        })
      }
    </>
  )
}