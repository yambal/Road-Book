import React from 'react'
import { LatLngBoundsExpression } from "leaflet"
import { Polyline, useMap } from "react-leaflet"
import { useAppSelector } from "../../app/hooks"
import { useGpsLogPolylines } from '../../app/selectors.ts/selector'


export const MapGpsLogView = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsJson.features)
  const polyLine = useGpsLogPolylines()[0]

  const map = useMap()

  React.useEffect(() => {
    if (gpsLogFeatures && gpsLogFeatures.length > 0) {
      const gpsLogFeature = gpsLogFeatures[0]
      if (gpsLogFeature.lineString) {
        let maxLat = 0, minLat = 180, maxLon = 0, minLon = 180
        gpsLogFeature.lineString.forEach((ls) => {
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
    }

  },[gpsLogFeatures, map])
  return (<>
    <Polyline pathOptions={{color: 'red'}} positions={polyLine} />
  </>)
}