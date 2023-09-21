import { Polyline } from "react-leaflet"
import { useGpsLogViewCurrentFeature, useLineStringGpsLogFeatures } from "../../../../app/selectors.ts/selector"
import React from "react"
import { LatLng } from "leaflet"
import { latLngFromGpsLogLatLng } from "../../../fileLoader/utils/latLng"

type PositionsAndId = {
  featureId: string
  positions: LatLng[]
}

export const PolylinesView = () => {
  const lineStringGpsLogFeatures = useLineStringGpsLogFeatures()
  const gpsLogViewCurrentFeature = useGpsLogViewCurrentFeature()

  const polyLines = React.useMemo(() => {
    const positionsAndIds: PositionsAndId[] = []

    if (lineStringGpsLogFeatures.length > 0) {
      lineStringGpsLogFeatures.forEach((feature) => {
        if (feature.polylineCoordinates) {
          const featureId = feature.id
          const positions = feature.polylineCoordinates.map(coordinate => {
            return latLngFromGpsLogLatLng(coordinate.coordinate)
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
          const color = gpsLogViewCurrentFeature?.id === polyLine.featureId ? "red" : "rgba(255, 0, 0, 0.35)"
          return (
            <Polyline pathOptions={{color}} positions={polyLine.positions} key={polyLine.featureId}/>
          )
        })
      }
    </>
  )
}