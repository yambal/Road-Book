import { Slider } from "@mui/material"
import { GpsLogFeature, GpsLogLatLng, PolylineCoordunate } from "../../../models/GpsJson"
import React from "react"
import { latLng } from "leaflet"
import { useAppDispatch } from "../../../app/hooks"
import { setCenter } from "../gpsLogViewSlice"

export type PolylinePlayerProps = {
  polylineFeature: GpsLogFeature | undefined
}

export const PolylinePlayer = ({
  polylineFeature
}:PolylinePlayerProps) => {
  const [polylineCoordinates, setPolylineCoordinates] = React.useState<PolylineCoordunate[] | undefined>(undefined)
  const [max, setMax] = React.useState<number>(0)
  const [cursor, setCursor] = React.useState<number | undefined>(undefined)
  const dispatch = useAppDispatch()
  // const map = useMap()
  
  React.useEffect(() => {
    if (polylineFeature?.polylineCoordinates) {
      setPolylineCoordinates(polylineFeature.polylineCoordinates)
      setMax(polylineFeature.polylineCoordinates.length - 1)
    } else {
      setPolylineCoordinates(undefined)
      setMax(0)
    }
    setCursor(undefined)
  }, [polylineFeature?.polylineCoordinates])

  const sliderHandler = React.useCallback((event: Event, newCursor: number | number[]) => {
    if (typeof newCursor === "number") {
      setCursor(newCursor)
    }
  }, [])

  React.useEffect(() => {
    if (polylineCoordinates && cursor) {
      const polylineCoordinate = polylineCoordinates[cursor]
      const to = latLng(polylineCoordinate.coordinate.lat, polylineCoordinate.coordinate.lng)
      const gpsLogLatLng: GpsLogLatLng = {
        lat: to.lat,
        lng: to.lng,
        alt: to.alt
      }
      dispatch(setCenter(gpsLogLatLng))
    }
  }, [polylineCoordinates, cursor, dispatch])

  return (
    <>
      <Slider defaultValue={0} step={1} max={max} onChange={sliderHandler} aria-label="Disabled slider" />
      {cursor}
    </>
  )
}