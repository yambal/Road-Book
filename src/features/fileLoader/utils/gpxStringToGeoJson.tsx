import * as tj from "@tmcw/togeojson"

const { DOMParser } = require('@xmldom/xmldom')

export const gpxStringToGeoJson = (gpx: string) => {
  const kml = new DOMParser().parseFromString(gpx);
  const converted = tj.gpx(kml)
  return converted
}