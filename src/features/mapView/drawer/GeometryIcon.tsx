import React from 'react'
import { GometryType } from "../../../models/GpsJson"
import Timeline from '@mui/icons-material/Timeline'
import Place from '@mui/icons-material/Place';

export type GeometryIconProps = {
  geometryType: GometryType
}

export const GeometryIcon = ({ geometryType }: GeometryIconProps) => {

  const geometryIcon = React.useMemo(() => {
    let icon = (<Place />)
    switch (geometryType) {
      case "LineString":
        icon = (<Timeline />)
    }
    return icon
  }, [geometryType])

  return (<>{geometryIcon}</>)
}