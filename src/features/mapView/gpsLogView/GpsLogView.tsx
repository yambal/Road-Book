import React from 'react'
import { LatLngBoundsExpression } from "leaflet"
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
        if (gpsLogViewCurrentFeature.polylineCoordinates) {
          let maxLat = 0, minLat = 180, maxLon = 0, minLon = 360
          gpsLogViewCurrentFeature.polylineCoordinates.forEach((ls) => {
            const c = ls.coordinate
            maxLat = c.lat + 90 > maxLat ? c.lat + 90 : maxLat
            minLat = c.lat + 90 < minLat ? c.lat + 90 : minLat
            maxLon = c.lng + 180 > maxLon ? c.lng + 180 : maxLon
            minLon = c.lng + 180 < minLon ? c.lng + 180 : minLon
          })

          const bound:LatLngBoundsExpression = [
            [minLat - 90, minLon - 180 ],
            [maxLat - 90, maxLon - 180 ],
          ]
          map.fitBounds(bound)
        }
      } else {
        if (gpsLogViewCurrentFeature.coordinate) {
          map.panTo(gpsLogViewCurrentFeature.coordinate)
        }
      }
    }
  }, [gpsLogViewCurrentFeature, map])

  return (<>
    <PolylinesView />
    <PointsView />
  </>)
}