import React from 'react'
import { LatLngBoundsExpression, LatLngExpression } from "leaflet"
import { useMap } from "react-leaflet"
import { PointsView } from './parts/PointsView'
import { PolylinesView } from './parts/PolylinesView'
import { useGpsLogViewCurrentFeature } from '../../../app/selectors.ts/selector'


export const GpsLogView = () => {
  const gpsLogViewCurrentFeature = useGpsLogViewCurrentFeature()

  const map = useMap()

  React.useEffect(() => {
    if (gpsLogViewCurrentFeature) {
      if (gpsLogViewCurrentFeature.geometryType === "LineString") {
        if (gpsLogViewCurrentFeature.lineString) {
          let maxLat = 0, minLat = 180, maxLon = 0, minLon = 180
          gpsLogViewCurrentFeature.lineString.forEach((ls) => {
            const c = ls.coordinate
            maxLat = c.latitude > maxLat ? c.latitude : maxLat
            minLat = c.latitude < minLat ? c.latitude : minLat
            maxLon = c.longitude > maxLon ? c.longitude : maxLon
            minLon = c.longitude < minLon ? c.longitude : minLon
          })
          const bound:LatLngBoundsExpression = [
            [minLon, minLat],
            [maxLon, maxLat],
          ]
          map.fitBounds(bound)
        }
      } else {
        if (gpsLogViewCurrentFeature.coordinate) {
          const to: LatLngExpression = [
            gpsLogViewCurrentFeature.coordinate.latitude,
            gpsLogViewCurrentFeature.coordinate.longitude
          ]
          map.panTo(to)
        }
      }
    }
  }, [gpsLogViewCurrentFeature, map])

  return (<>
    <PolylinesView />
    <PointsView />
  </>)
}