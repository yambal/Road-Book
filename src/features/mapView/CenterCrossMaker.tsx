import React from "react"
import { useMap, useMapEvent } from "react-leaflet"
import { CenterMaker } from "./gpsLogView/parts/CenterMaker"
import { LatLng } from "leaflet"
import { useMount } from "react-use"

export const CenterCrossMaker = () => {
  const [centerLatLng, SetCenterLatLng] = React.useState<undefined | LatLng>()
  const map = useMap()

  useMount(() => {
    const center = map.getCenter()
    SetCenterLatLng(center)
  })

  useMapEvent("move", () => {
    const center = map.getCenter()
    SetCenterLatLng(center)
  })

  return (
    <>
      {centerLatLng && <CenterMaker latLang={centerLatLng} />}
    </>
  )
}