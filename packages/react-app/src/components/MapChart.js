import React, { memo, useState } from "react";
import ReactDOM from "react-dom";
import { Button, LinkComp } from "/";
import { Link } from "react-router-dom";


import "./mapstyle.css";


import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";


const MapChart = () => {
  const [content, setTooltipContent] = useState("");

  return (
    <div id="map">
        
            <Link to={'/fundpoland'} className="nav-link"><Button>FundPoland</Button></Link>
        
        <div style={{margin: 5}}>Fund {content}</div>
        <ComposableMap>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                }}
                onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "black",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

    </div>
  );
};

export default MapChart;
