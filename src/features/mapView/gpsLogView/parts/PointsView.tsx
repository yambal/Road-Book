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
            return (
              <PointMaker latLang={f.coordinate} opacity={isCurrent ? 1 : 0.25} key={f.id} id={f.id} />
            )
          }
          return undefined
        })
      }
    </>
  )
}