import { TrackAPI } from "./datasources/TrackAPI"
import {GhibliAPI} from "./datasources/GhibliAPI";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI,
    ghibliAPI: GhibliAPI
  }
}