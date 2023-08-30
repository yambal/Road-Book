import React from 'react'
import { MapContainer, Polyline } from 'react-leaflet'
import { TileLayer, LayersControl } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
//import { useMap } from 'react-leaflet/hooks'

import 'leaflet/dist/leaflet.css'
import { useAppSelector } from '../../app/hooks'

/**
 * @see https://react-leaflet.js.org/
 * @see https://react-leaflet.js.org/docs/example-vector-layers/
 */

export type MapViewProps = {
  centerPotision:LatLngExpression
}

export const MapView = ({
  centerPotision,
}: MapViewProps) => {
  const gpsLogFeatures = useAppSelector(state => state.gpsJson.features)

  const polyLine = React.useMemo(() => {
    if (gpsLogFeatures && gpsLogFeatures.length > 0) {
      return gpsLogFeatures[0].lineString.map(ls => {
        const latlan: LatLngExpression = [
          ls.coordinate.longitude,
          ls.coordinate.latitude
        ]
        return latlan
      })
    }
    return []
  }, [gpsLogFeatures])

  return (
    <MapContainer
      center={centerPotision}
      zoom={13}
      scrollWheelZoom={true}
      attributionControl={true}
      zoomControl={true}
      dragging={true}
      doubleClickZoom={true}
      style={{
        width: "100%",
        aspectRatio: 16 / 9
      }}
    >
      <TileLayer
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={{color: 'red'}} positions={polyLine} />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Waze">
          <TileLayer
            attribution='Waze'
            url="https://worldtiles1.waze.com/tiles/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="OpenStreetMap">
          <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="写真">
          <TileLayer
            attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'
            url="https://maps.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  )
}