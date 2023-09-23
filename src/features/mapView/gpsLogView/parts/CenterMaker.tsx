import { LatLngExpression, icon } from "leaflet"
import React from "react"
import { Marker } from "react-leaflet"

export type CenterMakerProps = {
  latLang: LatLngExpression
  opacity?: number
}

const centerIcon = icon({
  iconUrl:require('./CrossIcon.png'),
  iconSize: [41, 41],
})

export const CenterMaker = ({
  latLang,
  opacity = 1
}: CenterMakerProps) => {
  return (
    <Marker icon={centerIcon} position={latLang} opacity={opacity} />
  )
}