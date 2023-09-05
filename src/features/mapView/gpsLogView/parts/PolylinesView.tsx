import { Polyline } from "react-leaflet"
import { useGpsLogPolylines } from "../../../../app/selectors.ts/selector"


export const PolylinesView = () => {
  const polyLines = useGpsLogPolylines()

  return (
    <>
      {
        polyLines.map((polyLine) => {
          return (
            <Polyline pathOptions={{color: 'red'}} positions={polyLine} />
          )
        })
      }
    </>
  )
}