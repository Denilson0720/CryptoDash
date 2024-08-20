import React, { useRef, useEffect } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisLeft,
} from "d3";
//data
// array of 185 floats
// sparklines = [1,...184]
// const data = [
//   { x: 0, y: 30 },
//   { x: 0.5, y: 10 },
//   { x: 1, y: 50 },
//   { x: 1.5, y: 5 },
//   { x: 2, y: 30 },
//   { x: 2.5, y: 45 },
//   { x: 3, y: 20 },
//   { x: 3.5, y: 60 },
//   { x: 4, y: 15 },
//   { x: 4.5, y: 35 },
//   { x: 5, y: 25 },
//   { x: 5.5, y: 55 },
//   { x: 6, y: 10 },
//   { x: 6.5, y: 40 },
//   { x: 7, y: 30 },
//   { x: 7.5, y: 50 },
//   { x: 8, y: 20 },
//   { x: 8.5, y: 45 },
//   { x: 9, y: 15 },
//   { x: 9.5, y: 55 }
// ];
// const data = ()=>{

// }
//chart component
function LineChart({data}){

  //refs
  const svgRef = useRef();

  //draws chart
  useEffect(() => {
    const svg = select(svgRef.current);

    //scales
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 100]).range([100, 0]);

    //axes
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(100px)").call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    //line generator
    const myLine = line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.y))
      .curve(curveCardinal);

    //drawing the line
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "#00bfa6");
  }, [data]);

  return (
    
      <svg ref={svgRef}>
        
        
      </svg>
    
  );
};

export default LineChart;