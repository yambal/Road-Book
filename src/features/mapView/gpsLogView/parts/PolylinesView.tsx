import { Polyline } from "react-leaflet"
import { useLineStringGpsLogFeatures } from "../../../../app/selectors.ts/selector"
import React from "react"
import { LatLngExpression, LatLngLiteral } from "leaflet"

type PositionsAndId = {
  featureId: string
  positions: LatLngLiteral[]
}

export const PolylinesView = () => {
  // const polyLines = useGpsLogPolylines()
  const lineStringGpsLogFeatures = useLineStringGpsLogFeatures()

  const polyLines = React.useMemo(() => {
    const positionsAndIds: PositionsAndId[] = []

    if (lineStringGpsLogFeatures.length > 0) {
      lineStringGpsLogFeatures.forEach((feature) => {
        if (feature.polylineCoordinates) {
          const featureId = feature.id
          const positions = feature.polylineCoordinates.map(coordinate => {
            const latlan: LatLngExpression = {
              lat: coordinate.coordinate.lat,
              lng: coordinate.coordinate.lng
            }
            return latlan
          })

          const positionsAndId: PositionsAndId = {
            featureId,
            positions
          }
          positionsAndIds.push(positionsAndId)
        }
        return undefined
      })
    }

    return positionsAndIds
  }, [lineStringGpsLogFeatures])

  return (
    <>
      {
        polyLines.map((polyLine) => {
          return (
            <Polyline pathOptions={{color: 'red'}} positions={polyLine.positions} key={polyLine.featureId}/>
          )
        })
      }
    </>
  )
}