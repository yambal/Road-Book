import React from "react"
import { useGpsLogViewCurrentFeature } from "../../../app/selectors.ts/selector"
import { GeometryIcon } from "../drawer/GeometryIcon"
import { Avatar, Box, Tabs, Tab, Slider } from "@mui/material"
import { PolylinePlayer } from "./PolylinePlayer"

export const Metadata = () => {
  const [selectedTabValue, setSelectedTabValue] = React.useState(0)
  const gpsLogViewCurrentFeature = useGpsLogViewCurrentFeature()

  const tabClickHandler = React.useCallback((event: React.SyntheticEvent, newNunber: number) => {
    setSelectedTabValue(newNunber)
  }, []) 

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '100%', flexGrow: 0}}>
      <div style={{display: 'flex', alignItems: 'center', padding: '4px', flexShrink: 0}}>
        {gpsLogViewCurrentFeature?.geometryType && 
          <Avatar><GeometryIcon geometryType={gpsLogViewCurrentFeature.geometryType}/></Avatar>
        }
        <div>
          {gpsLogViewCurrentFeature?.name}
        </div>
      </div>
      <Tabs value={selectedTabValue} onChange={tabClickHandler} style={{flexShrink: 0}}>
        <Tab label="basic" />
        <Tab label="Player" style={{display: gpsLogViewCurrentFeature?.geometryType !== "LineString" ? "none" : undefined}}/>
        <Tab label="meta" />
      </Tabs>
      <div style={{flexGrow:1, flexShrink:1, padding: '16px'}}>
        <div hidden={selectedTabValue !== 0}>
          
        </div>
        <div hidden={selectedTabValue !== 1}>
          <PolylinePlayer polylineFeature={gpsLogViewCurrentFeature}/>
        </div>
        <div hidden={selectedTabValue !== 2} style={{overflowY: 'scroll'}}>
          <pre style={{ margin: 0}}>{JSON.stringify(gpsLogViewCurrentFeature, null, 2)}</pre>
        </div>
      </div>
    </ div>
  )
}