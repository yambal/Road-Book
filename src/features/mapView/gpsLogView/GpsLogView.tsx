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

          let maxLat = 0, minLat = 180, maxLon = 0, minLon = 360
          gpsLogViewCurrentFeature.lineString.forEach((ls) => {
            const c = ls.coordinate
            maxLat = c.latitude + 90 > maxLat ? c.latitude + 90 : maxLat
            minLat = c.latitude + 90 < minLat ? c.latitude + 90 : minLat
            maxLon = c.longitude + 180 > maxLon ? c.longitude + 180 : maxLon
            minLon = c.longitude + 180 < minLon ? c.longitude + 180 : minLon
          })

          const bound:LatLngBoundsExpression = [
            [minLat - 90, minLon - 180 ],
            [maxLat - 90, maxLon - 180 ],
          ]

          console.log(bound)

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