import React, { memo } from "react";
import ReactDOM from "react-dom";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
  return (
    <div>
        <button>afglkas</button>
        <ComposableMap>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                />
              ))
            }
          </Geographies>
        </ComposableMap>
    </div>
  );
};

export default MapChart;
