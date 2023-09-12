import { Slider } from "@mui/material"
import { GpsLogFeature, GpsLogLatLng, PolylineCoordunate } from "../../../models/GpsJson"
import React from "react"
import { latLng } from "leaflet"
import { useAppDispatch } from "../../../app/hooks"
import { setCenter } from "../gpsLogViewSlice"
import dayjs from "dayjs"

export type PolylinePlayerProps = {
  polylineFeature: GpsLogFeature | undefined
}

export const PolylinePlayer = ({
  polylineFeature
}:PolylinePlayerProps) => {
  const [polylineCoordinates, setPolylineCoordinates] = React.useState<PolylineCoordunate[] | undefined>(undefined)
  const [startTs, setStartTs] = React.useState<number|undefined>(undefined)
  const [max, setMax] = React.useState<number>(0)
  const [cursor, setCursor] = React.useState<number | undefined>(undefined)
  const [currentPolylineCoordinate, setCurrentPolylineCoordinate] = React.useState<PolylineCoordunate | undefined>(undefined)
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
    if (polylineCoordinates && polylineCoordinates[0].time) {
      setStartTs(polylineCoordinates[0].time)
    } else {
      setStartTs(undefined)
    }

    if (polylineCoordinates && cursor !== undefined) {
      const polylineCoordinate = polylineCoordinates[cursor]
      const to = latLng(polylineCoordinate.coordinate.lat, polylineCoordinate.coordinate.lng)
      const gpsLogLatLng: GpsLogLatLng = {
        lat: to.lat,
        lng: to.lng,
        alt: to.alt
      }
      dispatch(setCenter(gpsLogLatLng))
      setCurrentPolylineCoordinate(polylineCoordinate)
    }
  }, [polylineCoordinates, cursor, dispatch])

  const time = React.useMemo(() => {
    let durationHms = ""
    let ymdHms =""
    if(currentPolylineCoordinate?.time) {
      if(startTs) {
        const duration = currentPolylineCoordinate.time - startTs
        const h = Math.floor((duration) / 3600)
        const m = Math.floor((duration % 3600) / 60)
        const s = duration - (3600 * h) - (60 * m)

        durationHms = ('00'+h).slice( -2 ) + ":" + ('00'+m).slice( -2 ) + ":" + ('00'+s).slice( -2 )
      }
      ymdHms = dayjs(currentPolylineCoordinate.time * 1000).format('YYYY/MM/DD hh:mm:ss')
    }
    return {
      durationHms,
      ymdHms
    }
  }, [currentPolylineCoordinate, startTs])

  return (
    <>
      <Slider defaultValue={0} step={1} max={max} onChange={sliderHandler} aria-label="Disabled slider" />
      {currentPolylineCoordinate && <div>
        
        {currentPolylineCoordinate.distanceFromStart}, {currentPolylineCoordinate.speed}<br />
        {time.ymdHms}<br />
        {time.durationHms}
      </div>}
    </>
  )
}