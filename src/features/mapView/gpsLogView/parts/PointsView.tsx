import { LatLngExpression } from "leaflet"
import { usePointGpsLogFeatures } from "../../../../app/selectors.ts/selector"
import { PointMaker } from "./PointMaker"


export const PointsView = () => {
  const pointFeature = usePointGpsLogFeatures()
  return (
    <>
      {
        pointFeature.map((f) => {
          if (f.coordinate) {
            const p:LatLngExpression = {
              lng:f.coordinate?.latitude,
              lat:f.coordinate.longitude
            }
            console.log(p)
            return (
              <PointMaker latLang={p} />
            )
          }
          return undefined
        })
      }
    </>
  )
}